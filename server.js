const express = require("express");
const axios = require("axios");
const cors = require("cors");
const parseLinkHeader = require("parse-link-header");
const qs = require("query-string");

const app = express();

//TODO: i just put it here for test porposes only
// in real world we should use prosecc env var.
const clientId = "a94d5a923bfa0a77fd4e";
const clientSecret = "81bbe07a9e0480582ddadfb3e5d31215c9d2ec12";

const FRONTEND_URL =
  process.env.FRONTEND_URI || "http://localhost:3000/callback";

const PORT = process.env.PORT || 3001;

const GITHUB_AUTHORIZE_URL =
  process.env.GITHUB_AUTHORIZE_URL || `https://github.com/login/oauth`;

const GIT_HUB_API_URL = "https://api.github.com";

app.use(cors());

app.get("/oauth", (req, res) =>
  res.redirect(
    `${GITHUB_AUTHORIZE_URL}/authorize?client_id=${clientId}&scope=repo`
  )
);

app.get("/callback", async (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };
  try {
    const { data = {} } = await axios.post(
      `${GITHUB_AUTHORIZE_URL}/access_token`,
      body,
      opts
    );
    res.redirect(FRONTEND_URL + "?access_token=" + data.access_token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/issues/orgs/:org/repos/:repo", async (req, res) => {
  try {
    const stringifiedQs = qs.stringify(req.query);
    const _res = await axios.get(
      `${GIT_HUB_API_URL}/repos/${req.params.org}/${req.params.repo}/issues${
        stringifiedQs ? "?" + stringifiedQs : ""
      }`,
      {
        headers: {
          authorization: req.headers["authorization"],
        },
      }
    );
    const pagination = parseLinkHeader(_res.headers["link"]);
    res.status(200).json({
      issues: _res.data,
      pagination: { ...pagination },
    });
  } catch ({ response, ...rest }) {
    res.status(response.status).json({ message: response.statusText });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
