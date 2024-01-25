import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FirebaseContext } from "../context/Firebase";
import { fetchUserPosts } from "../utils/fetchUserPosts";

const UserPosts = ({ userPosts, showAllPosts }) => {
  console.log(userPosts);

  const { userProfileData } = useContext(FirebaseContext);

  if (!userProfileData) {
    return <p>Loading...</p>;
  }
  const currentUserId = userProfileData.uid;

  const filteredPosts = showAllPosts
    ? userPosts
    : userPosts.filter((post) => post.uid === currentUserId);

  console.log("filteredPosts", userPosts);
  console.log("showAllPosts", showAllPosts);

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6 }} style={{ width: "100%" }}>
          {filteredPosts.length === 0 ? (
            <p>
              No posts yet.{" "}
              {showAllPosts ? "Start exploring!" : "Start posting!"}
            </p>
          ) : (
            filteredPosts.map((post) => (
              <Card
                key={post.postId}
                className="mb-3"
                style={{ width: "100%" }}
              >
                <Card.Body>
                  <Col>
                    <div
                      className="d-flex justify-content-space-between align-items-center gap-3"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <img
                        src={userProfileData.profilePic}
                        alt="Profile Pic"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <Card.Title>{userProfileData.userName}</Card.Title>
                    </div>
                  </Col>
                  <Col>
                    <Card.Text>{post.text}</Card.Text>
                  </Col>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserPosts;
