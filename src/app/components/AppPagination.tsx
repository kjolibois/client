import { Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { MetaData } from "../models/pagination";
interface Props{
    metaData:MetaData;
    onPageChange:(page:number) => void;
}
export default function AppPagination({metaData,onPageChange}:Props){
    const{currentPage,totalCount,totalPages,pageSize} = metaData;
    const pageCalc= currentPage *pageSize
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
          onChange={(e,page)=> onPageChange(page)}
        />

  </Box>
    )
}