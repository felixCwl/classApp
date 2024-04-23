const { forwardRef } = require("react");

const Dropdown = forwardRef(
  ({ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }, ref) => (
    <Dropdown
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

export default Dropdown;
