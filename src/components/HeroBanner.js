
import { Box, Button, Typography } from "@mui/material";
import bgimg from "../assets/images/bgimg.png";



export const HeroBanner = () => {
  return (
    <Box
      sx={{
       // mt: { lg: "212px", xs: "70px" },
      //  ml: { sm: "50px" },
        position: "relative",
        overflow: "hidden",
      }}
      p="20px"
    >
      <img
        src={bgimg}
        alt="Banner"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Typography color="#ff2625" fontWeight="600" fontSize="26px">
        Fitness Club
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "40px" } }}
        mb="23px"
        mt="30px"
      >
        Sweat, Smile <br /> and Repeat
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={4}>
        Check out the most effective exercises
      </Typography>
      <Typography
        fontWeight={600}
        color="#ff2625"
        sx={{
          opacity: 0.1,
          display: { lg: "block", xs: "none" },
        }}
        fontSize="200px"
      >
        Exercise
      </Typography>
    </Box>
  );
};
