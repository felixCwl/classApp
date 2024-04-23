class ClassClassificationRequestModel {
  constructor(classGradeExpectedInputMap = {}, classRankLimit = 0, firstClassName = "") {
    this.classGradeExpectedInputMap = classGradeExpectedInputMap;
    this.classRankLimit = classRankLimit;
    this.firstClassName = firstClassName;
  }
}

export default ClassClassificationRequestModel;
