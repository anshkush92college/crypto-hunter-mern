// Test -------------------------- Importing the Packages ---------------------------------
import { useState, useEffect } from "react";
import {
  Box,
  LinearProgress,
  Typography,
  Grid,
  Divider,
  List,
} from "@mui/material";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TagIcon from "@mui/icons-material/Tag";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SouthIcon from "@mui/icons-material/South";

// Test -------------------------- Importing the styles / other components ----------------
import CoinStats from "./CoinStats";

// Test -------------------------- The current component ----------------------------------
const CoinDescription = (props) => {
  const { coinData } = props;
  const { symbol, label } = useSelector((state) => state.currencyChanger);

  // Setting the state to the loading, then we will change it when it is not undefined
  const [isLoading, setIsLoading] = useState(true);

  // For checking whether we are getting the correct coin Data or not ------> CORRECT DATA
  console.log(symbol, label, coinData);

  const coin = {
    name: coinData?.name,
    image: coinData?.image.large,
    symbol: coinData?.symbol.toUpperCase(),
    description: parse(coinData?.description.en || ""),
    rank: coinData?.market_cap_rank,
    price: coinData?.market_data?.current_price[label.toLowerCase()],
    marketCap: coinData?.market_data?.market_cap[label.toLowerCase()],
    change24hr: coinData?.market_data?.market_cap_change_percentage_24h,
  };

  // Icons for the Value Stats
  const coinValueStatsIcons = [
    <TagIcon sx={{ color: "white" }}></TagIcon>,
    <MonetizationOnIcon sx={{ color: "white" }}></MonetizationOnIcon>,
    <MonetizationOnIcon sx={{ color: "white" }}></MonetizationOnIcon>,
    <EmojiEventsIcon sx={{ color: "white" }}></EmojiEventsIcon>,
    <SouthIcon sx={{ color: "white" }}></SouthIcon>,
  ];

  // Coins Value Stats
  const coinValueStats = [
    { rank: coinData?.market_cap_rank },
    { price: coinData?.market_data?.current_price[label.toLowerCase()] },
    { ath: coinData?.market_data?.ath[label.toLowerCase()] },
    { atl: coinData?.market_data?.atl[label.toLowerCase()] },
    { marketCap: coinData?.market_data?.market_cap[label.toLowerCase()] },
  ];

  useEffect(() => {
    // Should be true if coin name is not defined
    setIsLoading(coin.name === undefined);
    // console.log(coin.name, isLoading);
    return () => {
      console.log("Cleanup function from Coin Description");
    };
  }, [coin.name]);

  return isLoading ? (
    <LinearProgress sx={{ backgroundColor: "gold" }}></LinearProgress>
  ) : (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        mb="15px"
        alignItems="center"
        gap="15px"
      >
        <Box
          component="img"
          height="100px"
          alt={coin.name}
          src={coin.image}
          loading="lazy"
        ></Box>

        <Box>
          <Typography variant="h4" fontWeight="700">
            {coin.symbol}
          </Typography>
          <Typography variant="h5" fontWeight="500">
            {coin.name}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Typography variant="h5">
          {coin.name} live prices in{" "}
          <Typography
            variant="h5"
            component="span"
            fontWeight="900"
            sx={{ color: "gold" }}
          >
            {label}{" "}
          </Typography>
          currency
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "white", m: "10px auto" }}></Divider>

      <Grid container spacing={12}>
        <Grid item xs={6}>
          <Typography variant="h5">{coin.name} Value Statistics</Typography>
          <Typography variant="body1" mb="10px">
            An overview showing the statistics of{" "}
            <Typography
              component="span"
              fontWeight="900"
              sx={{ color: "gold" }}
            >
              {coin.name}
            </Typography>
            , such as the base and quote currency, the rank, and trading volume
          </Typography>
          <List>
            {coinValueStats.map((coin, index) => (
              <CoinStats
                key={index}
                icon={coinValueStatsIcons[index]}
                text={coin}
              ></CoinStats>
            ))}
          </List>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5">Other Stats Info</Typography>
          <Typography variant="body1" mb="10px">
            An overview showing the statistics of{" "}
            <Typography
              component="span"
              fontWeight="900"
              sx={{ color: "gold" }}
            >
              {coin.name}
            </Typography>
            , such as the number of exchanges, markets and total supply
          </Typography>
        </Grid>
      </Grid>

      <Box display="flex" flexDirection="column" gap="2px" mb="8px">
        <Typography variant="body1" sx={{ a: { color: "gold" } }}>
          {coin.description}
        </Typography>
      </Box>

      <Divider></Divider>
    </Box>
  );
};

// Test -------------------------- Exporting the current component ------------------------
export default CoinDescription;
