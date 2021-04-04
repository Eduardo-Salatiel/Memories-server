const { v4: uuidv4 } = require("uuid");
const Post = require("./../models/post");

exports.getPosts = async (req, res) => {
  const { limit, skipt } = req.query;
  try {
    const postMessage = await Post.find({})
      .populate("usuario", "name")
      .sort({ $natural: -1 })
      .skip(Number(skipt))
      .limit(Number(limit));

    Post.countDocuments({}, (err, count) => {
      const pages = Math.ceil(count / Number(limit));

      return res.status(200).json({
        ok: true,
        postMessage,
        pages,
      });
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: error.message,
    });
  }
};

exports.getUserPost = async (req, res) => {
  const { id } = req.body;
  const { limit, skipt } = req.query;

  try {
    const postMessage = await Post.find({usuario: id})
      .populate("usuario", "name")
      .sort({ $natural: -1 })
      .skip(Number(skipt))
      .limit(Number(limit));

    Post.countDocuments({usuario: id}, (err, count) => {
      const pages = Math.ceil(count / Number(limit));

      return res.status(200).json({
        ok: true,
        postMessage,
        pages,
      });
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  const body = req.body;
  try {
    //ARCHIVO
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        error: "La imagen es necesaria",
      });
    }
    //VALIDAR EXTENCION
    let selectedFile = req.files.selectedFile;
    let ext = selectedFile.mimetype.split("/")[1];
    const validExt = ["png", "jpg", "jpeg"];
    selectedFile.name = `${uuidv4()}.${ext}`;
    let imgUrl = `${process.env.HOST}:${process.env.PORT}/public/${selectedFile.name}`;

    if (validExt.indexOf(ext) < 0) {
      return res
        .status(400)
        .json({ ok: false, error: "Tipo de archivo invalido" });
    }

    selectedFile.mv(
      `${__dirname}/../db/img/${selectedFile.name}`,
      function (error) {
        if (error) return res.status(500).json({ ok: false, error });
      }
    );

    //GUARDAR EN LA BASE DE DATOS
    const nuevoPost = new Post(body);
    nuevoPost.usuario = req.id;
    nuevoPost.image = imgUrl;

    await nuevoPost.save();
    res.status(201).json({
      ok: true,
      nuevoPost,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};
