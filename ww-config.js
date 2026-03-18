export default {
  editor: {
    label: { en: 'PV Toast' },
    icon: 'bell',
    customSettingsPropertiesOrder: [
      'position',
      'life',
      'severity',
      'summary',
      'detail',
      'triggerMessage',
    ],
  },
  triggerEvents: [
    { name: 'close', label: { en: 'On close' }, event: { message: {} } },
  ],
  properties: {
    position: {
      label: { en: 'Position' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'top-right', label: { en: 'Top Right' } },
          { value: 'top-left', label: { en: 'Top Left' } },
          { value: 'top-center', label: { en: 'Top Center' } },
          { value: 'bottom-right', label: { en: 'Bottom Right' } },
          { value: 'bottom-left', label: { en: 'Bottom Left' } },
          { value: 'bottom-center', label: { en: 'Bottom Center' } },
          { value: 'center', label: { en: 'Center' } },
        ],
      },
      defaultValue: 'top-right',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'Toast position: top-right | top-left | top-center | bottom-right | bottom-left | bottom-center | center',
      },
      /* wwEditor:end */
    },
    life: {
      label: { en: 'Auto-dismiss (ms)' },
      type: 'Number',
      section: 'settings',
      defaultValue: 3000,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Duration in milliseconds before the toast auto-dismisses',
      },
      /* wwEditor:end */
    },
    severity: {
      label: { en: 'Severity' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'info', label: { en: 'Info' } },
          { value: 'success', label: { en: 'Success' } },
          { value: 'warn', label: { en: 'Warning' } },
          { value: 'error', label: { en: 'Error' } },
        ],
      },
      defaultValue: 'info',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Toast severity: info | success | warn | error',
      },
      /* wwEditor:end */
    },
    summary: {
      label: { en: 'Summary' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Toast title / summary text',
      },
      /* wwEditor:end */
    },
    detail: {
      label: { en: 'Detail' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Toast body / detail text',
      },
      /* wwEditor:end */
    },
    triggerMessage: {
      label: { en: 'Trigger' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'Change this value to trigger a toast. Each new value shows a new toast notification.',
      },
      /* wwEditor:end */
    },
  },
};
