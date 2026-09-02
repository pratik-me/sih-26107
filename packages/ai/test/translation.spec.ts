import { IndicLanguageEngine } from '../src/providers/translation.provider';
import { IndianLanguage } from '@bis/shared-types';

describe('IndicLanguageEngine', () => {
  const engine = new IndicLanguageEngine();

  it('should detect Hindi script correctly', async () => {
    const lang = await engine.detectLanguage('मुझे अपने product के लिए BIS certification चाहिए।');
    expect(lang).toBe(IndianLanguage.HI);
  });

  it('should detect Hinglish correctly', async () => {
    const lang = await engine.detectLanguage('ISI mark kaise verify karein?');
    expect(lang).toBe(IndianLanguage.HINGLISH);
  });

  it('should detect English correctly', async () => {
    const lang = await engine.detectLanguage('What is the applicable standard for stainless steel water bottles?');
    expect(lang).toBe(IndianLanguage.EN);
  });

  it('should preserve technical IS numbers and clause references during query processing', async () => {
    const query = 'IS 10500 Clause 4.2 me total dissolved solids ka limit kya hai?';
    const { translatedText, preservedEntities } = await engine.translateToEnglish(query, IndianLanguage.HINGLISH);

    expect(preservedEntities).toContain('IS 10500');
    expect(preservedEntities).toContain('Clause 4.2');
    expect(translatedText).toContain('IS 10500');
  });
});
