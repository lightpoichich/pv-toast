<template>
  <div class="pv-toast">
    <div class="pv-toast__inner">
      <!-- wwEditor:start -->
      <div class="pv-toast__badge">
        Toast — {{ props.content?.position || 'top-right' }} · {{ props.content?.life || 3000 }}ms
      </div>
      <!-- wwEditor:end -->
      <PvToast
        :position="props.content?.position || 'top-right'"
        unstyled
        :pt="passthrough"
        @close="handleClose"
        @life-end="handleLifeEnd"
      />
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import { installPrimeVue } from '../shared/install-primevue.js';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
  components: { PvToast: Toast },
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    installPrimeVue();

    const toast = useToast();
    const toastCount = ref(0);

    // Expose toastCount as an internal variable
    wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'toastCount',
      type: 'number',
      defaultValue: 0,
    });

    // Watch triggerMessage — each change fires a toast
    let lastTrigger = props.content?.triggerMessage;
    watch(
      () => props.content?.triggerMessage,
      (newVal) => {
        if (newVal === undefined || newVal === null || newVal === '') return;
        if (newVal === lastTrigger) return;
        lastTrigger = newVal;

        toast.add({
          severity: props.content?.severity || 'info',
          summary: props.content?.summary || '',
          detail: props.content?.detail || '',
          life: props.content?.life || 3000,
        });
        toastCount.value++;
      }
    );

    const handleClose = (message) => {
      toastCount.value = Math.max(0, toastCount.value - 1);
      emit('trigger-event', { name: 'close', event: { message } });
    };

    const handleLifeEnd = (message) => {
      toastCount.value = Math.max(0, toastCount.value - 1);
      emit('trigger-event', { name: 'close', event: { message } });
    };

    // PassThrough classes for unstyled PrimeVue Toast
    const passthrough = {
      root: { class: 'pv-toast__container' },
      message: ({ props: msgProps }) => ({
        class: [
          'pv-toast__message',
          `pv-toast__message--${msgProps?.message?.severity || 'info'}`,
        ],
      }),
      messageContent: { class: 'pv-toast__message-content' },
      messageText: { class: 'pv-toast__message-text' },
      summary: { class: 'pv-toast__summary' },
      detail: { class: 'pv-toast__detail' },
      closeButton: { class: 'pv-toast__close-button' },
      closeIcon: { class: 'pv-toast__close-icon' },
      messageIcon: { class: 'pv-toast__message-icon' },
    };

    return {
      props,
      passthrough,
      handleClose,
      handleLifeEnd,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../shared/styles/base';
@import '../shared/styles/tokens';

.pv-toast {
  &__inner {
    // Minimal footprint — this component is invisible in production
  }

  &__badge {
    font-size: 11px;
    color: #f59e0b;
    background: #fffbeb;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid #fde68a;
    display: inline-block;
  }

  // Toast container — fixed positioning handled by PrimeVue,
  // but we style the wrapper via PT
  :deep(.pv-toast__container) {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    pointer-events: none;
    box-sizing: border-box;
    width: 400px;
    max-width: calc(100vw - 32px);
  }

  // Toast message card
  :deep(.pv-toast__message) {
    @include pv-font;
    display: flex;
    align-items: flex-start;
    padding: 12px 16px;
    border-radius: var(--pv-radius, 8px);
    box-shadow: var(--pv-shadow, 0 4px 12px rgba(0, 0, 0, 0.12));
    pointer-events: auto;
    animation: pv-toast-enter 0.3s ease-out;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;

    // Severity colors
    &--info {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #1e40af;
    }

    &--success {
      background: #f0fdf4;
      border-color: #bbf7d0;
      color: #166534;
    }

    &--warn {
      background: #fffbeb;
      border-color: #fde68a;
      color: #92400e;
    }

    &--error {
      background: #fef2f2;
      border-color: #fecaca;
      color: #991b1b;
    }
  }

  :deep(.pv-toast__message-content) {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  :deep(.pv-toast__message-icon) {
    flex-shrink: 0;
    width: var(--pv-icon-size, 18px);
    height: var(--pv-icon-size, 18px);
    margin-top: 2px;
  }

  :deep(.pv-toast__message-text) {
    flex: 1;
    min-width: 0;
  }

  :deep(.pv-toast__summary) {
    font-weight: 600;
    font-size: var(--pv-font-size, 14px);
    line-height: 1.4;
    display: block;
  }

  :deep(.pv-toast__detail) {
    font-size: var(--pv-font-size-sm, 12px);
    margin-top: 4px;
    opacity: 0.85;
    line-height: 1.4;
    display: block;
  }

  :deep(.pv-toast__close-button) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--pv-radius-sm, 4px);
    opacity: 0.6;
    flex-shrink: 0;
    color: inherit;
    padding: 0;
    margin-left: 8px;
    transition: opacity var(--pv-transition, 150ms),
                background-color var(--pv-transition, 150ms);

    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.06);
    }
  }

  :deep(.pv-toast__close-icon) {
    width: 14px;
    height: 14px;
  }
}

@keyframes pv-toast-enter {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
