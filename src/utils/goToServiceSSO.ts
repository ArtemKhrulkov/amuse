export const goToServiceSSO = (url: string, cb: Function): Function => {
  return () => {
    //let timer: NodeJS.Timeout | null = null;
    const serviceLoginURL =
      process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_DEV_DOMAIN}/${url}?redirect_url=http://localhost:3000/`
        : `${url}`;
    window.open(serviceLoginURL, '_self');

    // timer = setInterval(() => {
    //   if (newWindow?.closed) {
    //     cb();
    //     if (timer) clearInterval(timer);
    //   }
    // }, 500);
  };
};
