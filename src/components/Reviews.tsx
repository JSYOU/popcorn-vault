import React from "react";
import styled from "styled-components";
import { ReviewResult } from "@/types/movie";

const ReviewsSection = styled.div`
  margin: 30px 0;
`;

const ReviewsTitle = styled.h2`
  margin-bottom: 10px;
`;

const ReviewItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const ReviewAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ReviewContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  max-height: 4.2em;
  overflow: hidden;
`;

interface ReviewsProps {
  reviews: ReviewResult[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <ReviewsSection>
      <ReviewsTitle>評論</ReviewsTitle>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem key={review.id}>
            <ReviewAuthor>{review.author}</ReviewAuthor>
            <ReviewContent>{review.content}</ReviewContent>
          </ReviewItem>
        ))
      ) : (
        <div>暫無評論</div>
      )}
    </ReviewsSection>
  );
};

export default Reviews;
