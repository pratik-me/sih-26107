"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndianLanguage = exports.QueryIntent = exports.FeedbackType = exports.ConfidenceLevel = exports.CertificationSchemeType = exports.StandardStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["CONSUMER"] = "CONSUMER";
    UserRole["INDUSTRY"] = "INDUSTRY";
    UserRole["STUDENT_RESEARCHER"] = "STUDENT_RESEARCHER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var StandardStatus;
(function (StandardStatus) {
    StandardStatus["ACTIVE"] = "ACTIVE";
    StandardStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    StandardStatus["OUTDATED"] = "OUTDATED";
    StandardStatus["WITHDRAWN"] = "WITHDRAWN";
    StandardStatus["ARCHIVED"] = "ARCHIVED";
})(StandardStatus || (exports.StandardStatus = StandardStatus = {}));
var CertificationSchemeType;
(function (CertificationSchemeType) {
    CertificationSchemeType["SCHEME_I_ISI"] = "SCHEME_I_ISI";
    CertificationSchemeType["SCHEME_II_CRS"] = "SCHEME_II_CRS";
    CertificationSchemeType["SCHEME_IV_COC"] = "SCHEME_IV_COC";
    CertificationSchemeType["SCHEME_FMCS"] = "SCHEME_FMCS";
    CertificationSchemeType["SCHEME_ECO_MARK"] = "SCHEME_ECO_MARK";
    CertificationSchemeType["SCHEME_HALLMARK"] = "SCHEME_HALLMARK"; // Assaying and Hallmarking
})(CertificationSchemeType || (exports.CertificationSchemeType = CertificationSchemeType = {}));
var ConfidenceLevel;
(function (ConfidenceLevel) {
    ConfidenceLevel["HIGH"] = "HIGH";
    ConfidenceLevel["MEDIUM"] = "MEDIUM";
    ConfidenceLevel["LOW"] = "LOW";
})(ConfidenceLevel || (exports.ConfidenceLevel = ConfidenceLevel = {}));
var FeedbackType;
(function (FeedbackType) {
    FeedbackType["HELPFUL"] = "HELPFUL";
    FeedbackType["NOT_HELPFUL"] = "NOT_HELPFUL";
    FeedbackType["REPORTED"] = "REPORTED";
})(FeedbackType || (exports.FeedbackType = FeedbackType = {}));
var QueryIntent;
(function (QueryIntent) {
    QueryIntent["FIND_STANDARD"] = "FIND_STANDARD";
    QueryIntent["CERTIFICATION_GUIDANCE"] = "CERTIFICATION_GUIDANCE";
    QueryIntent["TESTING_REQUIREMENTS"] = "TESTING_REQUIREMENTS";
    QueryIntent["LABORATORY_LOOKUP"] = "LABORATORY_LOOKUP";
    QueryIntent["HALLMARKING_VERIFICATION"] = "HALLMARKING_VERIFICATION";
    QueryIntent["CONSUMER_ISI_CHECK"] = "CONSUMER_ISI_CHECK";
    QueryIntent["CLAUSE_EXPLANATION"] = "CLAUSE_EXPLANATION";
    QueryIntent["COMPARE_STANDARDS"] = "COMPARE_STANDARDS";
    QueryIntent["COMPLIANCE_ROADMAP"] = "COMPLIANCE_ROADMAP";
    QueryIntent["GENERAL_BIS_INFO"] = "GENERAL_BIS_INFO";
})(QueryIntent || (exports.QueryIntent = QueryIntent = {}));
var IndianLanguage;
(function (IndianLanguage) {
    IndianLanguage["EN"] = "en";
    IndianLanguage["HI"] = "hi";
    IndianLanguage["BN"] = "bn";
    IndianLanguage["TE"] = "te";
    IndianLanguage["MR"] = "mr";
    IndianLanguage["TA"] = "ta";
    IndianLanguage["UR"] = "ur";
    IndianLanguage["GU"] = "gu";
    IndianLanguage["KN"] = "kn";
    IndianLanguage["OR"] = "or";
    IndianLanguage["ML"] = "ml";
    IndianLanguage["PA"] = "pa";
    IndianLanguage["AS"] = "as";
    IndianLanguage["MAI"] = "mai";
    IndianLanguage["SAN"] = "san";
    IndianLanguage["KAS"] = "kas";
    IndianLanguage["NEP"] = "nep";
    IndianLanguage["KOK"] = "kok";
    IndianLanguage["DOG"] = "dog";
    IndianLanguage["MNI"] = "mni";
    IndianLanguage["BOD"] = "bod";
    IndianLanguage["SAT"] = "sat";
    IndianLanguage["SD"] = "sd";
    IndianLanguage["HINGLISH"] = "hinglish"; // Hinglish mixed
})(IndianLanguage || (exports.IndianLanguage = IndianLanguage = {}));
//# sourceMappingURL=enums.js.map