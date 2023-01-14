import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styles from "./Room.styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={2} noWrap style={{ minWidth: "0" }}>
        <Item noWrap>Card</Item>
      </Grid>
      <Grid item xs={2} noWrap style={{ minWidth: "0" }}>
        <Item noWrap>Card</Item>
      </Grid>
      <Grid item xs={2} noWrap style={{ minWidth: "0" }}>
        <Item noWrap>Card</Item>
      </Grid>
      <Grid item xs={2} noWrap style={{ minWidth: "0" }}>
        <Item noWrap>Card</Item>
      </Grid>
      <Grid item xs={2} noWrap style={{ minWidth: "0" }}>
        <Item noWrap>Card</Item>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (
    <Box
      sx={{
        display: "flex",
        border: "3px solid red",
        marginTop: "2%",
        width: "80vw",
      }}
    >
      <Grid container spacing={1} style={styles.sx.GridBox} noWrap>
        <Grid container item spacing={2} style={styles.sx.GridBox} noWrap>
          <FormRow noWrap />
        </Grid>
        <Grid container item spacing={2} style={styles.sx.GridBox}>
          <FormRow />
        </Grid>
        <Grid container item spacing={2} style={styles.sx.GridBox}>
          <FormRow />
        </Grid>
        <Grid container item spacing={2} style={styles.sx.GridBox}>
          <FormRow />
        </Grid>
        <Grid container item spacing={2} style={styles.sx.GridBox}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}
