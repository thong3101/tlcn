import React, { useEffect } from "react";
import { Box, Pagination, Rating, Stack } from "@mui/material";

function Comment({ data }) {
  console.log("data", data);

  const size = 3;
  const [page, setPage] = React.useState(1);
  // const [totalPage, setTotalPage] = React.useState(4);


  

  const handleChangePage = (event, newValue) => {
    console.log(newValue);
    setPage(newValue);
  };

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;
  const totalPage = Math.ceil(data.length/size);

  console.log("1", totalPage);

  return (
    <Box className="detailProduct__comment">
      <Box className="detailProduct__title">
        <h2>ĐÁNH GIÁ SẢN PHẨM ({data?.length})</h2>
      </Box>
      {data?.slice(firstPostIndex, lastPostIndex).map((item) => {
        return (
          <Box className="detailProduct__comment-card">
            <div className="detailProduct__comment-card-user">
              <img
                src="https://secure.gravatar.com/avatar/f7c6b77bf377de274f6a06b9cf79fa95?s=60&d=mm&r=g"
                alt=""
              />
              <div className="detailProduct__comment-card-user-info">
                <h3>{item.user.nickName}</h3>
                <h4>
                  {item.createdAt[2]}/{item.createdAt[1]}/{item.createdAt[0]}
                </h4>
                <Rating readOnly value={item.rating} />
                <p>{item.comment}</p>
              </div>
            </div>
          </Box>
        );
      })}
      <Box className="detailProduct__comment-pagination">
        {totalPage > 1 ? (
          <Stack spacing={2}>
            <Pagination
              variant="outlined"
              shape="rounded"
              sx={{ justifyContent: "center" }}
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
export default Comment;
