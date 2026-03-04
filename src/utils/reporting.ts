import { dimensionNames, voiceKeys } from '../config/assessmentConfig';
import { AssessmentState, ConfidenceLevel, DimensionMapping, NarrativeReportData } from '../types/assessment';

const confidenceByScore = (score: number): ConfidenceLevel => {
  if (score >= 2) return '\u9ad8';
  if (score >= 1) return '\u4e2d';
  return '\u4f4e';
};

const brief = (value: string, fallback: string): string => {
  const clean = value.trim();
  if (!clean) return fallback;
  return clean.length > 28 ? `${clean.slice(0, 28)}...` : clean;
};

const reMotivation = /\u7ee7\u7eed|\u62c9\u56de\u6765|\u575a\u6301|\u5b8c\u6210/;
const reEmotion = /\u62ff\u4e0d\u51c6|\u72b9\u8c6b|\u6025|\u70e6|\u4e0d\u60f3/;
const reSelf = /\u6211\u540e\u6765|\u6211\u6539\u6210|\u6211\u5148/;
const reSocial = /\u6559|\u63d0\u9192|\u522b\u4eba/;

export const buildNarrativeReport = (state: AssessmentState): NarrativeReportData => {
  const pre = state.textResponses.srl_pre_text ?? '';
  const organize = state.textResponses.organize_text ?? '';
  const mid = state.textResponses.srl_mid_text ?? '';
  const post = state.textResponses.srl_post_text ?? '';
  const thinkRecorded = state.voiceResponses[voiceKeys.thinkQ3] === 'recorded';
  const audioCount = Object.values(state.audioUploads).filter((item) => item.uploaded).length;
  const imageCount = Object.values(state.imageUploads).filter((item) => item.uploaded).length;
  const processScore =
    (thinkRecorded ? 1 : 0) +
    (audioCount >= 2 ? 1 : 0) +
    (imageCount >= 2 ? 1 : 0);

  const narrative = [
    `\u8fdb\u5165\u4efb\u52a1\u65f6\uff0c\u5b66\u4e60\u8005\u7684\u524d\u7f6e\u8ba1\u5212\u662f\u201c${brief(pre, '\u5148\u786e\u8ba4\u9898\u76ee\u8981\u6c42')}\u201d\u3002`,
    '\u6d41\u7a0b\u6309\u201cQ1-Q2 \u7eb8\u9762\u4f5c\u7b54 -> Q3 think-aloud -> \u4e2d\u6bb5 SRL -> Q4-Q6 \u7eb8\u9762\u4f5c\u7b54\u201d\u63a8\u8fdb\u3002',
    thinkRecorded
      ? '\u5728 Q3 \u5df2\u5b8c\u6210 think-aloud \u5f55\u97f3\uff0c\u5173\u952e\u8fc7\u7a0b\u8bc1\u636e\u5df2\u5177\u5907\u3002'
      : '\u5728 Q3 \u672a\u5b8c\u6210 think-aloud \u5f55\u97f3\uff0c\u8be5\u8282\u70b9\u8bc1\u636e\u4ecd\u4e0d\u8db3\u3002',
    `\u4e2d\u6bb5 SRL \u8bb0\u5f55\u4e3a\u201c${brief(mid, '\u4e2d\u9014\u6709\u72b9\u8c6b\uff0c\u540e\u53c8\u91cd\u65b0\u68c0\u67e5\u6574\u4f53')}\u201d\u3002`,
    `\u4efb\u52a1\u540e\u590d\u76d8\u8868\u8fbe\u4e3a\u201c${brief(post, '\u4e0d\u80fd\u53ea\u770b\u5c40\u90e8\uff0c\u8981\u770b\u6574\u4f53\u5173\u7cfb')}\u201d\u3002`,
    imageCount >= 2
      ? '\u7b54\u9898\u7eb8\u4e0e\u8349\u7a3f\u7eb8\u5df2\u5168\u90e8\u4e0a\u4f20\uff0c\u53ef\u7528\u4e8e OCR \u4e0e\u4eba\u5de5\u590d\u6838\u3002'
      : '\u56fe\u7247\u8bc1\u636e\u672a\u4e0a\u4f20\u9f50\u5168\uff0c\u62a5\u544a\u89e3\u91ca\u8303\u56f4\u4f1a\u53d7\u9650\u3002',
    `\u672c\u6b21\u63d0\u4ea4\u97f3\u9891 ${audioCount} \u4efd\uff0c\u56fe\u7247 ${imageCount} \u5f20\u3002`,
  ];

  const evidenceChain = [
    `\u4efb\u52a1\u524d\uff1a${brief(pre, '\u5148\u786e\u8ba4\u4efb\u52a1\u6d41\u7a0b\u4e0e\u76ee\u6807')}`,
    `Q3 Think-Aloud\uff1a${thinkRecorded ? '\u5df2\u5b8c\u6210\u5f55\u97f3\u91c7\u6837' : '\u672a\u5b8c\u6210\u5f55\u97f3\u91c7\u6837'}`,
    `\u4efb\u52a1\u4e2d\uff1a${brief(mid, '\u6709\u62ff\u4e0d\u51c6\u65f6\u4f1a\u56de\u770b\u6574\u4f53')}`,
    `\u4efb\u52a1\u540e\uff1a${brief(post, '\u4e0d\u80fd\u53ea\u770b\u5c40\u90e8\uff0c\u8981\u770b\u6574\u4f53')}`,
  ];

  const dimensionEvidences = [
    {
      level: pre.length > 10 ? 'L3' : pre.length > 0 ? 'L2' : 'L1',
      evidence: `\u524d\u6d4b\u76ee\u6807\u8868\u8fbe\uff1a${brief(pre, '\u76ee\u6807\u8868\u8fbe\u8f83\u5c11')}`,
      score: pre.length > 10 ? 2 : pre.length > 0 ? 1 : 0,
    },
    {
      level: organize.length > 16 ? 'L3' : organize.length > 0 ? 'L2' : 'L1',
      evidence: `\u6574\u7406\u7ebf\u7d22\uff1a${brief(organize, '\u6574\u7406\u6587\u672c\u8f83\u5c11')}`,
      score: organize.length > 16 ? 2 : organize.length > 0 ? 1 : 0,
    },
    {
      level: mid.length > 10 || thinkRecorded ? 'L3' : mid.length > 0 ? 'L2' : 'L1',
      evidence: thinkRecorded
        ? 'Q3 \u542f\u7528 think-aloud\uff0c\u51fa\u73b0\u5373\u65f6\u76d1\u63a7\u8bc1\u636e\u3002'
        : `\u4e2d\u6bb5\u76d1\u63a7\uff1a${brief(mid, '\u76d1\u63a7\u7ebf\u7d22\u6709\u9650')}`,
      score: mid.length > 10 || thinkRecorded ? 2 : mid.length > 0 ? 1 : 0,
    },
    {
      level: reMotivation.test(mid + post) ? 'L3' : mid.length > 0 ? 'L2' : 'L1',
      evidence: `\u52a8\u673a\u8c03\u8282\uff1a${brief(mid + post, '\u52a8\u673a\u8c03\u8282\u7ebf\u7d22\u6709\u9650')}`,
      score: reMotivation.test(mid + post) ? 2 : mid.length > 0 ? 1 : 0,
    },
    {
      level: reEmotion.test(mid + post) ? 'L2' : 'L1',
      evidence: `\u60c5\u7eea\u7ebf\u7d22\uff1a${brief(mid + post, '\u60c5\u7eea\u7ebf\u7d22\u6709\u9650')}`,
      score: reEmotion.test(mid + post) ? 1 : 0,
    },
    {
      level: processScore >= 3 ? 'L3' : processScore >= 2 ? 'L2' : 'L1',
      evidence: '\u6267\u884c\u8f68\u8ff9\uff1a\u5df2\u5b8c\u6210\u4efb\u52a1\u4e3b\u5e72\u6d41\u7a0b\u4e0e\u5173\u952e\u63d0\u4ea4\u8282\u70b9\u3002',
      score: processScore >= 3 ? 2 : processScore >= 2 ? 1 : 0,
    },
    {
      level: state.downloadedFiles.length >= 2 && state.scratchpadPrepared ? 'L3' : state.downloadedFiles.length >= 1 ? 'L2' : 'L1',
      evidence: `\u8d44\u6e90\u4f7f\u7528\uff1a\u4e0b\u8f7d ${state.downloadedFiles.length} \u9879\uff0c\u8349\u7a3f\u7eb8${state.scratchpadPrepared ? '\u5df2\u51c6\u5907' : '\u672a\u51c6\u5907'}\u3002`,
      score: state.downloadedFiles.length >= 2 && state.scratchpadPrepared ? 2 : state.downloadedFiles.length >= 1 ? 1 : 0,
    },
    {
      level: reSelf.test(post + mid) ? 'L3' : post.length > 0 ? 'L2' : 'L1',
      evidence: `\u81ea\u6211\u89e3\u91ca\uff1a${brief(post + mid, '\u81ea\u6211\u89e3\u91ca\u8f83\u5c11')}`,
      score: reSelf.test(post + mid) ? 2 : post.length > 0 ? 1 : 0,
    },
    {
      level: post.length > 16 ? 'L3' : post.length > 0 ? 'L2' : 'L1',
      evidence: `\u8fc1\u79fb\u8868\u8fbe\uff1a${brief(post, '\u8fc1\u79fb\u8bed\u8a00\u8f83\u5c11')}`,
      score: post.length > 16 ? 2 : post.length > 0 ? 1 : 0,
    },
    {
      level: reSocial.test(post) ? 'L3' : post.length > 0 ? 'L2' : 'L1',
      evidence: `\u793e\u4f1a\u8c03\u8282\uff1a${brief(post, '\u9762\u5411\u4ed6\u4eba\u7684\u8868\u8fbe\u8f83\u5c11')}`,
      score: reSocial.test(post) ? 2 : post.length > 0 ? 1 : 0,
    },
  ];

  const dimensions: DimensionMapping[] = dimensionNames.map((name, index) => {
    const source = dimensionEvidences[index];
    return {
      dimension: name,
      level: source.level,
      alternativeLevel: source.level === 'L3' ? 'L2' : 'L2/L3',
      confidence: confidenceByScore(source.score),
      evidence: source.evidence,
    };
  });

  if (imageCount >= 2) {
    dimensions[6] = {
      ...dimensions[6],
      confidence: '\u9ad8',
      evidence: `${dimensions[6].evidence} \u5df2\u4e0a\u4f20\u7b54\u9898\u7eb8\u4e0e\u8349\u7a3f\u7eb8\u56fe\u7247\u3002`,
    };
  }

  return { narrative, evidenceChain, dimensions };
};
