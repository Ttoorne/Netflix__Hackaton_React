import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContextProvider";

export default function Auth() {
  const {
    email,
    password,
    user,

    emailError,
    passwordError,
    hasAccount,

    setEmail,
    setPassword,
    setHasAccount,

    handleSignUp,
    handleLogin,
  } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "100px 0px",
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/39f3c979-c105-4948-9c51-611eedf3a6fd/cbcb1617-1a2b-46ce-96ef-768e2a9c591f/KG-ru-20230612-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          border: "1px solid #000",
          borderRadius: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.7);",
          height: "600px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            color={"#fff"}
            sx={{ mt: 2, mb: 5 }}
          >
            {hasAccount ? "Войти" : "Зарегестрироваться"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ backgroundColor: "#333", input: { color: "#fff" } }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Адрес электронной почты"
              InputLabelProps={{ style: { color: "#8c8c8c" } }}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError}
              variant="filled"
            />
            <TextField
              sx={{ backgroundColor: "#333", input: { color: "#fff" } }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              InputLabelProps={{ style: { color: "#8c8c8c" } }}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError}
              variant="filled"
            />

            {hasAccount ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, height: "50px" }}
                onClick={() => {
                  handleLogin();
                }}
              >
                Войти
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, height: "50px" }}
                onClick={() => {
                  handleSignUp();
                }}
              >
                Зарегестрироваться
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color={"#fff"}>
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                {hasAccount ? (
                  <Link
                    onClick={() => setHasAccount(!hasAccount)}
                    href="#"
                    variant="body2"
                    color={"#fff"}
                  >
                    {"Нет аккаунта? Зарегестрируйтесь!"}
                  </Link>
                ) : (
                  <Link
                    onClick={() => setHasAccount(!hasAccount)}
                    href="#"
                    variant="body2"
                    color={"#fff"}
                  >
                    {"Уже есть аккаунт? Войдите!"}
                  </Link>
                )}
              </Grid>
            </Grid>
            <Typography
              sx={{
                mt: 3,
                color: "#8c8c8c",
                fontSize: "13px",
              }}
            >
              Эта страница защищена Google reCAPTCHA, чтобы мы знали, что вы не
              бот.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
