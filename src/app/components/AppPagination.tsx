import { Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { setPageNumber } from "../../features/catalog/catalogSlice";
import { MetaData } from "../models/pagination";
interface Props{
    metaData:MetaData;
    onPageChange:(page:number) => void;
}
export default function AppPagination({metaData,onPageChange}:Props){
    const{currentPage,totalCount,totalPages,pageSize} = metaData;
    const pageCalc= currentPage *pageSize
    const [pageNumber,setPageNnber] = useState(currentPage);
    function handlePageChange(page:number){
      setPageNumber(page);
      onPageChange(page);
    };
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography>
          Displaying {(currentPage-1)*pageSize+1} - 
          {pageCalc > totalCount 
          ? totalCount 
          : pageCalc} of {totalCount} items
        </Typography>
        <Pagination
          color="secondary"
          size='large'
          count={totalPages}
          page={currentPage}
          onChange={(e,page)=> handlePageChange(page)}
        />

  </Box>
    )
}