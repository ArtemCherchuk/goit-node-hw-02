const ctrWrapper = (ctr) => {
  const wrapper = async (req, res, next) => {
    try {
      await ctr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrapper;
};

module.exports = ctrWrapper;
