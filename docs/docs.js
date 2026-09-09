const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const router = express.Router();
const swaggerDocument = require('./Swagger');

const DisableDarkModePlugin = () => ({
  components: {
    DarkModeToggle: () => null,
  },
});

const DisableParameterAutoFillPlugin = function () {
  let allowBodyDefaults = false;

  // This function is serialized by swagger-ui-express and executed in the
  // browser, so every value it uses must live in this function's scope.
  const isLoginRequestBody = (props) => {
    const specPath =
      props.specPath?.toJS?.() || props.specPath || [];
    return specPath.includes('/api/user/login');
  };

  const isResourceMutationBody = (props) => {
    const specPath =
      props.specPath?.toJS?.() || props.specPath || [];
    const resourceIndex = specPath.findIndex?.((part) =>
      ['/api/category', '/api/food', '/api/restaurant'].some(
        (path) => part.startsWith(path),
      ),
    );
    const method =
      resourceIndex >= 0
        ? specPath[resourceIndex + 1]
        : undefined;
    return (
      resourceIndex >= 0 && ['post', 'patch'].includes(method)
    );
  };

  return {
    wrapComponents: {
      parameterRow: function (Original) {
        return class NoAutoFillParameterRow extends Original {
          setDefaultValue() {}

          componentDidMount() {
            if (this.props.isExecute) {
              this.props.onChange(this.props.rawParam, null);
            }
          }

          UNSAFE_componentWillReceiveProps(props) {
            super.UNSAFE_componentWillReceiveProps(props);
            if (!this.props.isExecute && props.isExecute) {
              props.onChange(props.rawParam, null);
            }
          }
        };
      },
      RequestBody: function (Original) {
        return function ScopedRequestBody(props) {
          allowBodyDefaults =
            isLoginRequestBody(props) ||
            isResourceMutationBody(props);
          return Original(props);
        };
      },
      RequestBodyEditor: function (Original) {
        return class NoAutoFillRequestBodyEditor extends Original {
          constructor(props, context) {
            super(
              allowBodyDefaults
                ? props
                : { ...props, defaultValue: undefined },
              context,
            );
          }

          UNSAFE_componentWillReceiveProps(props) {
            super.UNSAFE_componentWillReceiveProps({
              ...(allowBodyDefaults
                ? props
                : { ...props, defaultValue: undefined }),
            });
          }
        };
      },
    },
  };
};

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

router.get('/foodly-favicon.svg', (req, res) => {
  res.sendFile(path.join(__dirname, 'foodly-favicon.svg'));
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(swaggerDocument, {
    customfavIcon: '/api-docs/foodly-favicon.svg',
    customJsStr: `
      (() => {
        const clearRegisterBody = () => {
          const operation = [...document.querySelectorAll('.opblock')].find(
            (element) => element.textContent.includes('Register a new user'),
          );
          if (!operation) return;

          operation.querySelectorAll('input:not([type="file"])').forEach((input) => {
            const setter = Object.getOwnPropertyDescriptor(
              HTMLInputElement.prototype,
              'value',
            ).set;
            setter.call(input, '');
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          });
        };

        document.addEventListener('click', (event) => {
          if (event.target.closest('.try-out__btn')) {
            setTimeout(clearRegisterBody, 0);
            setTimeout(clearRegisterBody, 100);
          }
        });
      })();
    `,
    swaggerOptions: {
      deepLinking: true,
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      validatorUrl: null,
      plugins: [DisableParameterAutoFillPlugin, DisableDarkModePlugin],
    },
  }),
);

module.exports = {
  router,
  swaggerDocument,
};
