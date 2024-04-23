/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* sample React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
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
      {
        author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <SampleBox ml={-1}>
            <SampleBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
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
            11/01/19
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
      {
        author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        function: <Job title="Executive" description="Projects" />,
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
            19/09/17
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
      {
        author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
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
            24/12/08
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
      {
        author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        function: <Job title="Manager" description="Executive" />,
        status: (
          <SampleBox ml={-1}>
            <SampleBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
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
            04/10/21
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
      {
        author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <SampleBox ml={-1}>
            <SampleBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
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
            14/09/20
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
