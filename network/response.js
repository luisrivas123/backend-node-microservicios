export class Response {
  success = (req, res, message = '', status = 200) => {
    res.status(status).send({
      error: false,
      status,
      message
    })
  }

  error = (req, res, message = 'Internal server error', status = 500) => {
    res.status(status).send({
      error: true,
      status,
      message
    })
  }
}
