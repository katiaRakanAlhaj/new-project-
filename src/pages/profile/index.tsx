import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Icon,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  cardInfo,
  container,
  formInput,
  personProfileImage,
  popup,
} from "../../components/style/style";
import {
  IconEmail,
  IconLocation,
  IconPhone,
  IconProfile,
} from "../../icons/icon";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Modal from "../models/model";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { shawError, shawSuccess } from "../../lib/tosts";
import { theme } from "../../../theme";
import { userProfileApi } from "../../api/profile/api";
import { TProfileUser } from "../../api/profile/interfaces";
import { userQueries } from "../../api/profile/query";

const ProfilePage = ({ themeMode }: { themeMode: string }) => {
  const [otherUser, setUser] = useState<TProfileUser>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [currentModal, setCurrentModal] = useState("");

  const toggleModal = (modal: string) => {
    setCurrentModal(modal);
    setIsModalOpen(!isModalOpen);
  };
  const { data: user } = userQueries.useGetUser(selectedId);

  const { handleSubmit, control, setValue } = useForm<TProfileUser>({
    defaultValues: {
      name: otherUser?.name,
      email: otherUser?.email,
      phone: otherUser?.phone,
      location: otherUser?.location,
    },
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const getUser = async () => {
        const users = await userProfileApi.getUsers();
        const parsedUser = JSON.parse(user);
        const filterUser = users.find(
          (_user) => _user.name === parsedUser.name
        );
        setUser(filterUser);
        setValue("name", filterUser?.name || "");
        setValue("email", filterUser?.email || "");
        setValue("phone", filterUser?.phone || "");
        setValue("location", filterUser?.location || "");
      };
      getUser();
    }
  }, [user, setValue]);

  const { t } = useTranslation();

  const inputs = [
    {
      name: "name",
      label: t("Name"),
    },
  ];

  const inputsTwo = [
    {
      name: "email",
      label: t("email"),
    },
    {
      name: "phone",
      label: t("phone"),
    },
    {
      name: "location",
      label: t("location"),
    },
  ];

  const handleUpdate = (modal: string, id?: number) => {
    if (id) {
      setSelectedId(id);
    }
    toggleModal(modal);
  };

  const handleFormSubmit = async (data: TProfileUser) => {
    try {
      const updatedUser = {
        ...otherUser!,
        name: data.name,
      };
      await userProfileApi.updateUser({
        data: data,
        id: otherUser?.id || 0,
      });
      setUser(updatedUser);
      shawSuccess(t("Profile updated successfully"));
    } catch (error) {
      shawError("Error updating profile");
    }
  };

  const handleSubmitFormTwo = async (data: TProfileUser) => {
    try {
      const updatedUser = {
        ...otherUser!,
        email: data.email,
        phone: data.phone,
        location: data.location,
      };
      await userProfileApi.updateUser({
        data: data,
        id: otherUser?.id || 0,
      });
      setUser(updatedUser);
      shawSuccess(t("Profile updated successfully"));
    } catch (error) {
      shawError("Error updating profile");
    }
  };
  const icons = [
    {
      id: "0",
      label: t("email"),
      icon: <IconEmail />,
      text: <Typography>{otherUser?.email}</Typography>, // Include the otherUser?.name value here
    },
    {
      id: "1",
      label: t("phone"),
      icon: <IconPhone />,
      text: <Typography>{otherUser?.phone}</Typography>, // Include the otherUser?.name value here
    },
    {
      id: "2",
      label: t("location"),
      icon: <IconLocation />,
      text: <Typography>{otherUser?.location}</Typography>, // Include the otherUser?.name value here
    },
  ];
  return (
    <Box
      sx={container}
      style={{
        backgroundColor:
          themeMode === "dark"
            ? theme.palette.primary.dark
            : theme.palette.background.default,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0F172A",
          height: "25vh",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          height: "25vh",
          borderBottomRightRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}
        style={{
          backgroundColor:
            themeMode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.background.default,
          border: themeMode === "dark" ? "solid 1px white" : "none",
        }}
      >
        <Toolbar>
          <Avatar src="../images/user-1.ad58ce72.jpg" sx={personProfileImage} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "7rem",
            }}
          >
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                {otherUser?.name}
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                front end developer
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                $32,400
              </Typography>
              <Typography sx={{ color: "#475569" }}>Total Balance</Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                200
              </Typography>
              <Typography sx={{ color: "#475569" }}>Board Card</Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                3200
              </Typography>
              <Typography sx={{ color: "#475569" }}>Calender Events</Typography>
            </Box>
            <Button onClick={() => handleUpdate("name", otherUser?.id)}>
              <IconProfile />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={cardInfo}
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === "dark" ? "solid 1px white" : "none",
            }}
          >
            <Typography
              style={{
                color:
                  themeMode === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
              variant="h6"
            >
              Info
            </Typography>
            <hr style={{ width: "100%" }} />
            <>
              {icons.map((item) => (
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
                >
                  <Box>
                    <Icon
                      sx={{
                        cursor: "pointer",
                        marginTop: "1.5rem",
                        color:
                          themeMode === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                      key={item.id}
                    >
                      {item.icon}
                    </Icon>
                  </Box>
                  <Box sx={{ marginTop: "1rem" }}>
                    <Typography color={"#64748B"} key={item.id}>
                      {item.label}
                    </Typography>
                    <Typography color={"#64748B"} key={item.id}>
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Icon
                sx={{ cursor: "pointer" }}
                onClick={() => handleUpdate("email", otherUser?.id)}
              >
                <IconProfile />
              </Icon>
            </>
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ width: "100%", borderRadius: "5px" }}>
          <Box
            sx={{
              background: "#fff",
              marginTop: "2rem",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === "dark" ? "solid 1px white" : "none",
            }}
          >
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
          </Box>
        </Grid>
      </Grid>
      <Modal
        onClose={() => toggleModal("name")}
        openModal={isModalOpen && currentModal === "name"}
      >
        <Box
          component="form"
          sx={popup}
          onSubmit={handleSubmit(handleSubmitFormTwo)}
          style={{
            backgroundColor:
              themeMode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            border: themeMode === "dark" ? "solid 1px white" : "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
            style={{
              color:
                themeMode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            Update Profile
          </Typography>
          <Grid container spacing={2}>
            {inputs.map((input) => (
              <Grid item xs={12} key={input.name}>
                <Controller
                  name={input.name as keyof TProfileUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        label={input.label}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" size="small">
              {t("Submit")}
            </Button>
            <Button
              onClick={() => toggleModal("name")}
              variant="contained"
              size="small"
            >
              {t("Close")}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        onClose={() => toggleModal("email")}
        openModal={isModalOpen && currentModal === "email"}
      >
        <Box
          component="form"
          sx={popup}
          onSubmit={handleSubmit(handleFormSubmit)}
          style={{
            backgroundColor:
              themeMode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            border: themeMode === "dark" ? "solid 1px white" : "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
            style={{
              color:
                themeMode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            Update Profile
          </Typography>
          <Grid container spacing={2}>
            {inputsTwo.map((input) => (
              <Grid item xs={12} key={input.name}>
                <Controller
                  name={input.name as keyof TProfileUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        label={input.label}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" size="small">
              {t("Submit")}
            </Button>
            <Button
              onClick={() => toggleModal("email")}
              variant="contained"
              size="small"
            >
              {t("Close")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
