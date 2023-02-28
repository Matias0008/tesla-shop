import { ChangeEvent, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";

import { VALID_SIZES, VALID_TYPES, VALID_GENDERS } from "@/constants";
import { dbProducts } from "@/database";
import { Product } from "@/interfaces";
import { tesloApi } from "@/api";
import { ProductModel } from "@/models";

import { AdminLayout } from "@/components/layouts";

interface Props {
  product: Product;
}

interface FormData {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

const ProductAdminPage: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });
  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(/[^a-zA-Z0-9_]/gi, " ")
            .replace(/\s+/g, "_")
            .toLowerCase() || "";
        setValue("slug", newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;
    const { files } = target;

    try {
      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteImage = async (image: string) => {
    setValue(
      "images",
      getValues("images").filter((_image) => _image !== image),
      {
        shouldValidate: true,
      }
    );
  };

  const onSubmit = async (formData: FormData) => {
    if (formData.images.length < 2) {
      return alert("El producto necesita al menos 2 (dos) imagenes");
    }
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: "/admin/products",
        method: formData._id ? "PUT" : "POST",
        data: formData,
      });

      if (!formData._id) {
        router.replace(`/admin/products`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onChangeSize = (size: string) => {
    const currentSizes = getValues("sizes");
    if (currentSizes.includes(size)) {
      setValue(
        "sizes",
        currentSizes.filter((_size) => _size !== size),
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue("sizes", currentSizes.concat(size), {
        shouldValidate: true,
      });
    }
  };

  const onAddTag = (tag: string) => {
    const newTag = tag.trim().toLowerCase();
    setNewTagValue("");
    const currentTags = getValues("tags");

    if (currentTags.includes(newTag)) return;
    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues("tags").filter((_tag) => _tag !== tag);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  return (
    <AdminLayout
      title={"Producto"}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "EL mínimo son 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 1, message: "El mínimo es 1 caracter" },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "Este campo es requerido",
                min: { value: 0, message: "El valor minimo es 0 (cero)" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "Este campo es requerido",
                min: { value: 1, message: "El valor minimo es $1" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues("type")}
                onChange={({ target }) =>
                  setValue("type", target.value, {
                    shouldValidate: true,
                  })
                }
              >
                {VALID_TYPES.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues("gender")}
                onChange={({ target }) =>
                  setValue("gender", target.value, {
                    shouldValidate: true,
                  })
                }
              >
                {VALID_GENDERS.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {VALID_SIZES.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox />}
                  label={size}
                  checked={getValues("sizes").includes(size)}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "Este campo es requerido",
                validate: (val) =>
                  val.trim().includes(" ")
                    ? "No puede contener espacios en blanco"
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyDown={(event) =>
                event.code === "Space" ? onAddTag(newTagValue) : undefined
              }
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues("tags").length > 0 ? (
                getValues("tags").map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => onDeleteTag(tag)}
                      color="primary"
                      size="small"
                      sx={{ ml: 1, mt: 1 }}
                    />
                  );
                })
              ) : (
                <Chip
                  label="Aca apareceran las etiquetas"
                  color="primary"
                  size="small"
                  sx={{ ml: 1, mt: 1 }}
                />
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 2 }}
                onClick={() => inputRef.current?.click()}
              >
                Cargar imagen/es
              </Button>
              <input
                ref={inputRef}
                type="file"
                multiple={true}
                accept="image/jpg, image/jpeg, image/png"
                style={{ display: "none" }}
                onChange={onFileSelected}
              />

              <Chip
                label="Es necesario al menos 2 imagenes"
                color="error"
                variant="outlined"
                sx={{
                  mb: 2,
                  display: getValues("images").length < 2 ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                        width={90}
                        height={120}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => onDeleteImage(img)}
                        >
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;
  let product: Product | null;

  if (slug === "new") {
    let tempProduct = JSON.parse(JSON.stringify(new ProductModel()));
    delete tempProduct._id;
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
