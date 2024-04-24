// @mui material components
import Card from "@mui/material/Card";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <SampleBox pt={3} px={2}>
        <SampleTypography variant="h6" fontWeight="medium">
          Billing Information
        </SampleTypography>
      </SampleBox>
      <SampleBox pt={1} pb={2} px={2}>
        <SampleBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          />
        </SampleBox>
      </SampleBox>
    </Card>
  );
}

export default BillingInformation;
