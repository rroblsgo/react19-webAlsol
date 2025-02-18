declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
      render: (container: string | HTMLElement, parameters: any) => void;
    };
  }
}
export {};
