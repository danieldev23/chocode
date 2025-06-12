declare module "nuxt-storage" {
  const nuxtStorage: {
    localStorage: {
      setData: (key: string, value: any, ttl?: number) => void;
      getData: (key: string) => any;
      removeData: (key: string) => void;
    };
    sessionStorage: {
      setData: (key: string, value: any, ttl?: number) => void;
      getData: (key: string) => any;
      removeData: (key: string) => void;
    };
  };

  export default nuxtStorage;
}
