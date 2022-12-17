import { useState, useEffect } from "react";
import {Box,Rating} from "@mui/material";
import {Pagination} from "@mui/material";


function Comment ({data}) {

    return (
        <Box className="detailProduct__comment">
                <Box className="detailProduct__title">
                  <h2>ĐÁNH GIÁ SẢN PHẨM ({data?.length})</h2>
                </Box>
                {data?.map((item) => {
                    
                    return (
                        <Box className="detailProduct__comment-card">
                            <div className="detailProduct__comment-card-user">
                                <img src="https://secure.gravatar.com/avatar/f7c6b77bf377de274f6a06b9cf79fa95?s=60&d=mm&r=g" alt="" />
                                <div className="detailProduct__comment-card-user-info">
                                <h3>{item.user.nickName}</h3>
                                <h4>{item.createdAt[2]}/{item.createdAt[1]}/{item.createdAt[0]}</h4>
                                <Rating readOnly value={item.rating} />
                                <p>{item.comment}</p>
                                </div>
                            </div>
                        </Box>
                    )
                })}
                <Box className="detailProduct__comment-pagination">
                  <Pagination count={2} shape="rounded" sx={{ justifyContent: "center" }}/>
                </Box>
            </Box>
    )
};
export default Comment;