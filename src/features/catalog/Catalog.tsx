
import { FormGroup, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import useProducts from "../../app/hooks/useProducts";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
const sortOptions=[
  {value:'name',label:'Alphabetical'},
  {value:'priceDesc',label:'Price - High to low'},
  {value:'price',label:'Price - Low to High'},



]
export default function Catalog(){
/*
  const {products, filtersLoaded,brands,types, metaData}= useProducts();
  const{productParams} = useAppSelector(state => state.catalog);

    const dispatch = useAppDispatch();
*/
    
    const products = useAppSelector(productSelectors.selectAll);

    const{productsLoaded, filtersLoaded,brands,types, productParams,metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    useEffect(()=>{
      if(!productsLoaded) dispatch(fetchProductsAsync());
    },[productsLoaded,dispatch])
    useEffect(()=>{
      if(!filtersLoaded) dispatch(fetchFilters());
    },[dispatch,filtersLoaded])
    
    if (!filtersLoaded) return <LoadingComponent message = {"Loading Products..."}/>
    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
              <Paper sx={{mb:2}}>
                  <ProductSearch />
              </Paper>
              <Paper sx={{mb:2,p:2}}>
                    <RadioButtonGroup 
                      selectedValue={productParams.orderBy}
                      options={sortOptions}
                      onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                    
                    />
              </Paper>
              <Paper sx={{mb:2,p:2}}>
                  <CheckboxButtons
                   items={brands}
                   checked= {productParams.brands}
                   onChange={(items:string[]) => dispatch(setProductParams({brands:items}))}
                  
                  />
              </Paper>
              <Paper sx={{mb:2,p:2}}>
              <FormGroup>
              <CheckboxButtons
                   items={types}
                   checked= {productParams.types}
                   onChange={(items:string[]) => dispatch(setProductParams({types:items}))}
                  
                  />
              </FormGroup>
              </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}></ProductList>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb:2}}>
              {metaData && <AppPagination
                metaData={metaData}
                onPageChange={(page:number) => dispatch(setPageNumber({pageNumber: page}))} 

                />}
            </Grid>

        </Grid>
        
    )
}