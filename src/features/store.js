import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "./BlogSlice";
import SkillSlice from "./SkillSlice";
import ExperienceSlice from "./Experience";

export default configureStore({
  reducer: {
    skill: SkillSlice,
    blog: BlogSlice,
    experience: ExperienceSlice
  },
});
