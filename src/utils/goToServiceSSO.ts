export const goToServiceSSO = (url: string, cb: Function): Function => {
  return () => {
    let timer: NodeJS.Timeout | null = null;
    const serviceLoginURL =
      process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_DEV_DOMAIN}/${url}`
        : `${url}`;
    const newWindow = window.open(
      serviceLoginURL,
      '_blank',
      'width=500,height=600'
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          cb();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
};
