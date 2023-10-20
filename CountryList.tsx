import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Grid, TextField, Typography, styled } from "@mui/material";
import CountryCard from "./CountryCard";

const GET_COUNTRIES = gql`
  query GetCountries($code: [String!]) {
    countries(filter: { code: { in: $code } }) {
      code
      name
      native
      phone
      capital
      currency
      languages {
        name
        native
        rtl
      }
      continent {
        name
      }
      emoji
      states {
        name
      }
    }
  }
`;

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      native
      phone
      capital
      currency
      languages {
        name
        native
        rtl
      }
      continent {
        name
      }
      emoji
      states {
        name
      }
    }
  }
`;

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiInput-underline:after': {
        border: '.2rem solid black',
        borderRadius: '10px'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '.2rem solid',
            borderColor: 'black',
            borderRadius: '10px'
        },
        '&:hover fieldset': {
            border: '.2rem solid ',
            borderColor: 'black',
            borderRadius: '10px'
        },
        '&.Mui-focused fieldset': {
            border: '.2rem solid ',
            borderColor: 'black',
            borderRadius: '10px'
        },
    },
});

const CountryList: React.FC = () => {
    const [search, setSearch] = useState<string[]>([]);
    const { loading, error, data } = useQuery(GET_COUNTRIES, {
        variables: { code: search },
    });
    const { data: allCountriesData } = useQuery(GET_ALL_COUNTRIES);
    
    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h1" width='350px' fontSize='3rem'>
                Countries
            </Typography>
            <CssTextField
                label="Search by country codes (comma-separated)"
                value={search.join(",")}
                onChange={(e) => setSearch(e.target.value.toLocaleUpperCase().split(","))}
                style={{
                    marginBottom: '2rem',
                    minWidth: '350px'
                }}
            />
            (<Grid container spacing={2}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data &&
                    data.countries.map((country: any) => (
                        <Grid item xs={12} sm={6} md={4} key={country.code}>
                            <CountryCard country={country} />
                        </Grid>
                    ))}
            </Grid>)
            {search.length === 0 && allCountriesData && allCountriesData.countries &&
                <Grid container spacing={2}>
                    {allCountriesData.countries.map((country: any) => (
                        <Grid item xs={12} sm={6} md={4} key={country.code}>
                            <CountryCard country={country} />
                        </Grid>
                    ))}
                </Grid>
            }
        </Container>
    );
};

export default CountryList;

export const CountryNameCodeSearch: React.FC = () => {
    const [search, setSearch] = React.useState("");
    const [countries, setCountries] = useState<any[]>([]);

    const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

    useEffect(() => {
        if (data && data.countries) {
            setCountries(data.countries);
        }
    }, [data]);

    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
             <Typography variant="h1" width='350px' fontSize='3rem'>
                Countries
            </Typography>
            <CssTextField
                label="Search by country code"
                value={search}

                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: '2rem',
                    minWidth:'350px'
                }}
            />

            <Grid container spacing={2}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {countries
                    .filter((country) =>
                        country.code.toLowerCase().includes(search.toLowerCase()) ||
 country.name.toLowerCase().includes(search.toLowerCase()) //to change 'name or code search'
                    )
                    .map((country: any) => (
                        <Grid display='grid' xs={12} lg={4} md={6} key={country.code}>
                            <CountryCard country={country} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};


