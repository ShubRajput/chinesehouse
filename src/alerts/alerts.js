import { enqueueSnackbar } from "notistack";

export const showAlert = (message, type = "info") => {
  enqueueSnackbar(message, {
    variant: type,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 3000,
  });
};
