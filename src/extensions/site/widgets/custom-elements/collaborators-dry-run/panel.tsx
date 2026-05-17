import {
  Box,
  FillPreview,
  FormField,
  Input,
  SidePanel,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { inputs, widget } from '@wix/editor';
import React, { type FC, useCallback, useEffect, useState } from 'react';

const DEFAULT_BG = '#290505ff';
const DEFAULT_ACCENT = '#6c63ff';
const DEFAULT_TEXT = '#e8e6ff';

const ColorField: FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <SidePanel.Field>
    <FormField label={label}>
        <Box width="45px" height="45px">
        <FillPreview
          fill={value}
          onClick={() =>
            inputs.selectColor(value, {
              onChange: (val) => { if (val) onChange(val); },
            })
          }
        />
      </Box>
    </FormField>
  </SidePanel.Field>
);

const Panel: FC = () => {
  const [title, setTitle] = useState('Collaborators Dry Run');
  const [subtitle, setSubtitle] = useState('Active team members');
  const [bgColor, setBgColor] = useState(DEFAULT_BG);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);
  const [textColor, setTextColor] = useState(DEFAULT_TEXT);

  useEffect(() => {
    Promise.all([
      widget.getProp('title'),
      widget.getProp('subtitle'),
      widget.getProp('bg-color'),
      widget.getProp('accent-color'),
      widget.getProp('text-color'),
    ])
      .then(([t, s, bg, accent, text]) => {
        if (t) setTitle(t);
        if (s) setSubtitle(s);
        if (bg) setBgColor(bg);
        if (accent) setAccentColor(accent);
        if (text) setTextColor(text);
      })
      .catch((err) => console.error('Failed to load widget props:', err));
  }, []);

  const handleTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    widget.setProp('title', e.target.value);
  }, []);

  const handleSubtitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.target.value);
    widget.setProp('subtitle', e.target.value);
  }, []);

  const handleBgColor = (v: string) => { setBgColor(v); widget.setProp('bg-color', v); };
  const handleAccentColor = (v: string) => { setAccentColor(v); widget.setProp('accent-color', v); };
  const handleTextColor = (v: string) => { setTextColor(v); widget.setProp('text-color', v); };

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300" height="100vh">
        <SidePanel.Header title="Collaborators Settings" />
        <SidePanel.Content noPadding stretchVertically>
          <Box direction="vertical" gap="SP4">
            <SidePanel.Field>
              <FormField label="Title">
                <Input value={title} onChange={handleTitle} placeholder="Widget title" />
              </FormField>
            </SidePanel.Field>
            <SidePanel.Field>
              <FormField label="Subtitle">
                <Input value={subtitle} onChange={handleSubtitle} placeholder="Subtitle text" />
              </FormField>
            </SidePanel.Field>
            <ColorField label="Background Color" value={bgColor} onChange={handleBgColor} />
            <ColorField label="Accent Color" value={accentColor} onChange={handleAccentColor} />
            <ColorField label="Text Color" value={textColor} onChange={handleTextColor} />
          </Box>
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;
