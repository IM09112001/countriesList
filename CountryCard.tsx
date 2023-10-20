import React from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';

interface CountryCardProps {
  country: {
    code: string;
    name: string;
    native: string;
    phone: string;
    capital: string;
    currency: string;
    languages: { name: string; native: string; rtl: boolean }[];
    continent: { name: string };
    emoji: string;
    states: { name: string }[];
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Box sx={{ minWidth: 350 }} margin='auto' border='3px solid black' borderRadius='9px' padding='.8rem'>

      <Grid item justifyContent="space-between" direction='row' container style={{ flexWrap: 'nowrap' }}>
        <Tooltip title="Add" placement="top-start">
          <Grid container direction='row' maxWidth='80%'>

            <Typography color="text.secondary" style={{
              'color': 'black',
              fontSize: '5rem',
              lineHeight: 1,
              'width': '5rem',
            }}> {country.emoji}</Typography>


            <Grid container direction='column' marginLeft='0' maxWidth='30%' marginTop='auto' marginBottom='auto' padding='0'>
              <Typography variant="h5" color="text.primary" component="div" whiteSpace='nowrap'>
                {(country.name.trim().includes(' ') && 'The ' + country.code) || country.name}
              </Typography>
              <Typography color="text.secondary" whiteSpace='nowrap'>{country.capital}</Typography>

            </Grid>
          </Grid>
        </Tooltip>

        <Tooltip title="Add" placement="top-end">
          <Typography color="text.secondary" lineHeight='1' style={{whiteSpace: 'nowrap'}}> 
          {country.continent.name}
          </Typography>
        </Tooltip>

      </Grid>

      <Grid item container direction='row' justifyContent='space-around' textAlign='center'>
      <Tooltip title="Add" placement="bottom-start">
        <Typography style={{ verticalAlign: 'middle' }} color="text.secondary">
          <CallIcon style={{ verticalAlign: 'middle' }} /> {country.phone}
        </Typography>
        </Tooltip>
        
        <Tooltip title="Add" placement="bottom">
        <Typography color="text.secondary">	  {country.currency && '💱' + country.currency}</Typography>
          </Tooltip>
          <Tooltip title="Add" placement="bottom-end">
          <Typography color="text.secondary">
            {country.languages.length>0 && <LanguageIcon style={{ verticalAlign: 'middle' }} />}
            {country.languages.map((language, index) => (
                  <span style={{ verticalAlign: 'middle' }} key={language.name}>
                    {(index===country.languages.length-1 && ' '+language.name) || ' '+language.name+','}
                  </span>
                ))}
          </Typography>
    </Tooltip>


      </Grid>

    </Box>
  );
};

export default CountryCard;
