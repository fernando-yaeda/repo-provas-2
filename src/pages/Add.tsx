import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api, { Category } from "../services/api";

function Add() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [selectDiscipline, setSelectDiscipline] = React.useState<any>([]);
  const [selectCategory, setSelectCategory] = React.useState<any>([]);

  interface Test {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
  }

  const [formData, setFormData] = React.useState<Test>({
    name: "",
    pdfUrl: "",
    category: "",
    discipline: "",
    teacher: "",
  });

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: disciplinesData } = await api.getDisciplines(token);
      setSelectDiscipline(
        disciplinesData.disciplines.map((discipline: any) => discipline.name)
      );

      const { data: categoriesData } = await api.getCategories(token);
      setSelectCategory(
        categoriesData.categories.map((category: any) => category.name)
      );
    }
    loadPage();
  }, [token]);

  return (
    <>
      <Typography
        sx={{
          marginX: "auto",
          marginBottom: "45px",
          width: "450px",
          textAlign: "center",
          fontWeight: "500",
          fontSize: "24px",
        }}
      >
        Adicione uma prova
      </Typography>
      <Divider sx={{ marginBottom: "35px" }} />
      <Box
        sx={{
          marginX: "auto",
          width: "700px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/app/disciplinas")}
          >
            Disciplinas
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/app/pessoas-instrutoras")}
          >
            Pessoa Instrutora
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/app/adicionar")}
          >
            Adicionar
          </Button>
        </Box>
        <Box
          //component={"form"}
          //onSubmit={}
          sx={{
            marginTop: "50px",
            marginBottom: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <TextField label="Título da prova" variant="outlined" />
          <TextField label="PDF da prova" variant="outlined" />
          <Autocomplete
            options={selectCategory}
            renderInput={(params) => (
              <TextField {...params} label="Categoria" />
            )}
            onChange={(event: any, value: string | null) => {
              setFormData({ ...formData, category: value as string });
            }}
          />
          <Autocomplete
            options={selectDiscipline}
            renderInput={(params) => (
              <TextField {...params} label="Disciplina" />
            )}
            onChange={(event: any, value: string | null) => {
              setFormData({ ...formData, discipline: value as string });
            }}
          />
          <Autocomplete
            disabled={formData.discipline === "" || !formData.discipline}
            options={["teste1", "teste2"]}
            renderInput={(params) => (
              <TextField {...params} label="Pessoa Instrutora" />
            )}
            onClick={() => console.log(formData.discipline)}
          />
          <Button type="submit" variant="contained">
            enviar
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Add;