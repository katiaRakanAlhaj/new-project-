import { Box, Typography } from "@mui/material";
// import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import "chart.js/auto"; // ADD THIS

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: "100%", backgroundColor: "#F1F5F9", padding: "2rem" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {t("welcome to dashboard")}
        </Typography>
        {/* <Box sx={{ width: "100%", height: "100%", background: "#fff" }}>
          <Line
            data={{
              labels: ["Jun", "Jul", "Aug"],
              datasets: [
                {
                  label: "sadsada",
                  data: [5, 6, 7],
                },
                {
                  label: "asdsads",
                  data: [3, 2, 1],
                },
              ],
            }}
          />
        </Box> */}
      </Box>
    </Box>
  );
};
export default Home;
