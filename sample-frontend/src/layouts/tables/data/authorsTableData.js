// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleAvatar from "components/SampleAvatar";
import SampleBadge from "components/SampleBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <SampleBox display="flex" alignItems="center" lineHeight={1}>
      <SampleAvatar src={image} name={name} size="sm" />
      <SampleBox ml={2} lineHeight={1}>
        <SampleTypography display="block" variant="button" fontWeight="medium">
          {name}
        </SampleTypography>
        <SampleTypography variant="caption">{email}</SampleTypography>
      </SampleBox>
    </SampleBox>
  );

  const Job = ({ title, description }) => (
    <SampleBox lineHeight={1} textAlign="left">
      <SampleTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </SampleTypography>
      <SampleTypography variant="caption">{description}</SampleTypography>
    </SampleBox>
  );

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} name="John Michael" email="john@testing.com" />,
        function: <Job title="Manager" description="Organization" />,
        status: (
          <SampleBox ml={-1}>
            <SampleBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </SampleBox>
        ),
        employed: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23/04/18
          </SampleTypography>
        ),
        action: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </SampleTypography>
        ),
      },
    ],
  };
}

// Add prop validation for the "Author" component
Author.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Job.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
