
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage(){
    const{basket} = useAppSelector(state => state.basket)



    
   // if (loading) return <LoadingComponent message='Loading basket..'/>
    if(!basket) return <Typography variant='h3'> Your basket is </Typography>
    return (
        <>
            <h1>Basket</h1>
            <h1>Buyer Id = {basket.buyerId}</h1>
            <BasketTable items={basket.items} />
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <BasketSummary/>
                    <Button
                        component= {Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                    Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}