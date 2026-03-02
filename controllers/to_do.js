import toDoServices from "../services/to_do.js";

export const createToDo = async (req, res, next) => {
  try {
    let params = {};
    params.data = req.body;

    const list = await toDoServices.createToDo(params);
    res.status(200).json({
      success: true,
      message: "To do created successfully",
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

export const getToDos = async (req, res, next) => {
  try {
    let params = {};
    let {status, page, priority, completed, limit} =  req.query;
    params.status =status;
    params.page =page;
    params.priority =priority;
    params.completed =completed;
    params.limit =limit;

    const list = await toDoServices.getToDos(params);
    res.status(200).json({
      success: true,
      message: "To do list fetched successfully",
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

export const getToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    let params = {};
    params.id = id;

    const list = await toDoServices.getToDoById(params);
    res.status(200).json({
      success: true,
      message: "To do fetched successfully",
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

export const updateToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    let params = {};
    params.id = id;
    params.data = req.body;

    const list = await toDoServices.updateToDoById(params);
    res.status(200).json({
      success: true,
      message: "To do updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    let params = {};
    params.id = id;

    const list = await toDoServices.DeleteToDoById(params);
    res.status(200).json({
      success: true,
      message: "To do deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};