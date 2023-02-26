export const validateUrlRegex =
  /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;

export const validateEmailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/i;
