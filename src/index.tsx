import { showToast, Toast, getPreferenceValues } from "@raycast/api";
import { v4 as uuidv4 } from "uuid";
import fetch from "cross-fetch";

interface Preferences {
  apiKey: string;
  saveLocationUrl: string;
  quickTags?: string;
}

interface Arguments {
  text: string;
}

// 获取格式化的时间戳
function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 从preferences获取标签
function getQuickTags(): string {
  const { quickTags } = getPreferenceValues<Preferences>();
  return quickTags ? ` ${quickTags}` : '';
}

async function validateWfApiKey(): Promise<void> {
  const { apiKey } = getPreferenceValues<Preferences>();
  const response = await fetch("https://beta.workflowy.com/api/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const data = await response.json();
  if (!data || !response.ok) {
    throw new Error("Invalid API Key. Set it in the extension preferences and try again.");
  }
}

async function submitToWorkflowy(text: string): Promise<void> {
  const { apiKey, saveLocationUrl } = getPreferenceValues<Preferences>();
  const timestamp = getTimestamp();
  const tags = getQuickTags();
  const fullText = `${timestamp} ${text}${tags}`;

  const response = await fetch("https://beta.workflowy.com/api/bullets/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      new_bullet_id: uuidv4(),
      new_bullet_title: fullText,
      save_location_url: saveLocationUrl,
    }),
  });

  const data = await response.json();
  if (!data || !response.ok) {
    throw new Error(
      "Failed to submit to Workflowy. Please check your API key and save location url."
    );
  }
}

export default async function Command(props: { arguments: Arguments }) {
  const { text } = props.arguments;

  try {
    await validateWfApiKey();
    await submitToWorkflowy(text);
    await showToast({
      style: Toast.Style.Success,
      title: "Added to Workflowy",
    });
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
