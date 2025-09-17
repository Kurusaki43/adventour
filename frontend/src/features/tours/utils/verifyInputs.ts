export const verifyFields = (fn: () => void) => {
  trigger(StepInputsToValidate).then((isValid) => {
    const isValidDiscountPrice =
      Number(getValues("priceDiscount") || 0) < Number(getValues("price"));
    if (getValues("priceDiscount") && !isValidDiscountPrice)
      setError("priceDiscount", {
        message: "Price Discount Should Be Less Than Price",
      });
    if (isValid && isValidDiscountPrice) {
      fn();
    }
  });
};
