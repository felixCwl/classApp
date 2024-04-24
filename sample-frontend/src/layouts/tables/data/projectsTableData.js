// @mui material components
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleAvatar from "components/SampleAvatar";
import SampleProgress from "components/SampleProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <SampleBox display="flex" alignItems="center" lineHeight={1}>
      <SampleAvatar src={image} name={name} size="sm" variant="rounded" />
      <SampleTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </SampleTypography>
    </SampleBox>
  );

  const Progress = ({ color, value }) => (
    <SampleBox display="flex" alignItems="center">
      <SampleTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </SampleTypography>
      <SampleBox ml={0.5} width="9rem">
        <SampleProgress variant="gradient" color={color} value={value} />
      </SampleBox>
    </SampleBox>
  );

  return {
    columns: [
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project image={LogoAsana} name="Asana" />,
        budget: (
          <SampleTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $2,500
          </SampleTypography>
        ),
        status: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            working
          </SampleTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: (
          <SampleTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </SampleTypography>
        ),
      },
      {
        project: <Project image={logoGithub} name="Github" />,
        budget: (
          <SampleTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $5,000
          </SampleTypography>
        ),
        status: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            done
          </SampleTypography>
        ),
        completion: <Progress color="success" value={100} />,
        action: (
          <SampleTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </SampleTypography>
        ),
      },
      {
        project: <Project image={logoAtlassian} name="Atlassian" />,
        budget: (
          <SampleTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $3,400
          </SampleTypography>
        ),
        status: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            canceled
          </SampleTypography>
        ),
        completion: <Progress color="error" value={30} />,
        action: (
          <SampleTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </SampleTypography>
        ),
      },
      {
        project: <Project image={logoSpotify} name="Spotify" />,
        budget: (
          <SampleTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $14,000
          </SampleTypography>
        ),
        status: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            working
          </SampleTypography>
        ),
        completion: <Progress color="info" value={80} />,
        action: (
          <SampleTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </SampleTypography>
        ),
      },
      {
        project: <Project image={logoSlack} name="Slack" />,
        budget: (
          <SampleTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $1,000
          </SampleTypography>
        ),
        status: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            canceled
          </SampleTypography>
        ),
        completion: <Progress color="error" value={0} />,
        action: (
          <SampleTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </SampleTypography>
        ),
      },
      {
        project: <Project image={logoInvesion} name="Invesion" />,
        budget: (
          <SampleTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $2,300
          </SampleTypography>
        ),
        status: (
          <SampleTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            done
          </SampleTypography>
        ),
        completion: <Progress color="success" value={100} />,
        action: (
          <SampleTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </SampleTypography>
        ),
      },
    ],
  };
}
