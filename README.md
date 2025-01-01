# Send to Workflowy Inbox - Raycast Extension

A Raycast extension that lets you quickly send notes, tasks, or any text to your Workflowy inbox. Each entry is automatically timestamped and can be tagged with your predefined tags.

## Features

- 🚀 Quick entry: Type and send directly from Raycast
- ⏰ Automatic timestamps: Each entry includes creation time
- 🏷️ Quick tags: Automatically append your predefined tags
- 🔑 Secure: Your Workflowy API key is stored securely
- 🎯 Customizable: Choose your own inbox location in Workflowy

## Installation

1. Install the extension from Raycast Store
2. Configure the required settings:
   - Get your Workflowy API key from https://workflowy.com/api-key/
   - Set your Workflowy inbox location URL
   - (Optional) Configure your quick tags

## Configuration

### Required Settings

1. **API Key**
   - Visit https://workflowy.com/api-key/
   - Copy your API key
   - Paste it in the extension preferences

2. **Save Location URL**
   - In Workflowy, navigate to the bullet you want to use as your inbox
   - Right-click the bullet and select "Copy Internal Link"
   - Paste the URL in the extension preferences

### Optional Settings

3. **Quick Tags**
   - Enter your frequently used tags, separated by commas
   - Example: `#todo,#work,#later`
   - These tags will be automatically added to every entry

## Usage

1. Trigger Raycast
2. Type `Send to WF` to find the extension
3. Enter your text
4. Press Enter to send

Your text will be automatically formatted as:  
2024-02-20 14:30 Buy milk #todo #work

## Tips

- You can still add additional tags in your text input
- The timestamp format is fixed to `YYYY-MM-DD HH:mm` for consistent sorting
- Quick tags are optional - if not configured, entries will only include the timestamp

## License

MIT License - feel free to modify and reuse this extension as needed.

