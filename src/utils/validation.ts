import { responseKeys, voiceKeys } from '../config/assessmentConfig';
import { AssessmentState } from '../types/assessment';

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

const hasText = (value?: string, min = 1): boolean => (value ?? '').trim().length >= min;

const downloadedAny = (state: AssessmentState, prefix: string): boolean => state.downloadedFiles.some((id) => id.startsWith(prefix));

const srlDone = (state: AssessmentState, type: 'pre' | 'mid' | 'post'): boolean => {
  const key = type === 'pre' ? voiceKeys.pre : type === 'mid' ? voiceKeys.mid : voiceKeys.post;
  const audio = type === 'pre' ? state.audioUploads.pre.uploaded : type === 'mid' ? state.audioUploads.mid.uploaded : state.audioUploads.post.uploaded;
  const textKey = type === 'pre' ? responseKeys.pre : type === 'mid' ? responseKeys.mid : responseKeys.post;
  return state.voiceResponses[key] === 'recorded' || audio || hasText(state.textResponses[textKey], 4);
};

export const validateNodeReadiness = (nodeId: string, state: AssessmentState): ValidationResult => {
  switch (nodeId) {
    case 'stage1_overview':
      return state.scratchpadPrepared ? { valid: true } : { valid: false, message: '请先标记“草稿纸已准备”。' };

    case 'stage1_pre_srl':
      return srlDone(state, 'pre') ? { valid: true } : { valid: false, message: '请完成前置 SRL（录音/上传/文字任一）。' };

    case 'stage2_teach_video':
      return { valid: true };

    case 'stage2_teach_check': {
      if (!state.lessonCheckChoice) return { valid: false, message: '请先完成教学确认问题。' };
      if (!downloadedAny(state, 'teach_')) return { valid: false, message: '请先下载至少 1 份教学材料。' };
      return { valid: true };
    }

    case 'stage2_organize':
      return { valid: true };

    case 'stage3_q1_direct':
      return downloadedAny(state, 'task_') ? { valid: true } : { valid: false, message: '请先下载至少 1 份任务材料。' };

    case 'stage3_q3_conflict_think':
      return state.voiceResponses[voiceKeys.thinkQ3] === 'recorded'
        ? { valid: true }
        : { valid: false, message: '请先完成 Q3 Think-Aloud 录音占位。' };

    case 'stage3_mid_srl':
      return srlDone(state, 'mid') ? { valid: true } : { valid: false, message: '请完成中段 SRL（录音/上传/文字任一）。' };

    case 'stage3_q4_variation_a':
    case 'stage3_result':
      return { valid: true };

    case 'stage4_post_srl':
      return srlDone(state, 'post') ? { valid: true } : { valid: false, message: '请完成后置 SRL（录音/上传/文字任一）。' };

    case 'stage4_submit': {
      const answerImg = state.imageUploads.answerSheet.uploaded;
      const scratchImg = state.imageUploads.scratchSheet.uploaded;
      return answerImg && scratchImg ? { valid: true } : { valid: false, message: '请上传答题纸和草稿纸两类图片。' };
    }

    case 'stage4_waiting':
      return { valid: true };

    default:
      return { valid: true };
  }
};
