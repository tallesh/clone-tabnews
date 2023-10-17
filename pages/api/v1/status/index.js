function status(req, response) {
  response.status(200).json({ chave: "tudo bão?" });
}

export default status;
