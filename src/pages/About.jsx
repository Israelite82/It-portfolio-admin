import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { aboutAPI } from "../lib/apiService";

// Menu Bar component for rich text formatting
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Strike"
      >
        <s>S</s>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Heading 3"
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Numbered List"
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded text-sm ${
          editor.isActive('blockquote') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="Quote"
      >
        " Quote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-100"
        title="Divider"
      >
        —
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-100"
        title="Undo"
      >
        ↶
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1.5 rounded text-sm text-gray-600 hover:bg-gray-100"
        title="Redo"
      >
        ↷
      </button>
    </div>
  );
};

// Rich Text Editor component using TipTap
const RichTextEditor = ({ value, onChange, placeholder, height = 300 }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: placeholder || 'Write your content here...',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        style={{ minHeight: `${height}px` }}
        className="rich-text-editor"
      />
    </div>
  );
};

function ImageUpload({ label, onImageChange, existingImage, onRemove }) {
  const [preview, setPreview] = useState(null);
  const [removed, setRemoved] = useState(false);  // ← track if user explicitly removed

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setRemoved(false);
      onImageChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setRemoved(true);  // ← mark as explicitly removed
    onImageChange?.(null);
    if (onRemove) onRemove();
  };

  // Determine what image to show
  const displayImage = preview || (!removed && existingImage) || null;

  return (
    <div>
      <label className="block text-xs text-gray-900 font-medium mb-1.5">{label}</label>
      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id={label.replace(/\s/g, '')}
          />
          <label
            htmlFor={label.replace(/\s/g, '')}
            className="w-full h-[220px] bg-[#e8eaf6] border border-[#c5c8e8] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#dde0f5] transition-colors overflow-hidden"
          >
            {displayImage ? (
              <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 text-[#7c7fc4] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="text-xs text-[#7c7fc4] font-medium">Click to upload {label.toLowerCase()}</p>
              </div>
            )}
          </label>
        </div>
        {displayImage && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

// Array field component for dynamic lists
function ArrayField({ label, items, onItemsChange, itemFields }) {
  const handleAdd = () => {
    const newItem = {};
    itemFields.forEach(field => {
      newItem[field.name] = '';
    });
    onItemsChange([...items, newItem]);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const handleChange = (index, fieldName, value) => {
    const newItems = [...items];
    newItems[index][fieldName] = value;
    onItemsChange(newItems);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-gray-700">Item {index + 1}</h4>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          {itemFields.map(field => (
            <div key={field.name} className="mb-3">
              <label className="block text-xs text-gray-600 font-medium mb-1.5">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={item[field.name] || ''}
                  onChange={(e) => handleChange(index, field.name, e.target.value)}
                  rows={field.rows || 2}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#c5a355]"
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={item[field.name] || ''}
                  onChange={(e) => handleChange(index, field.name, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#c5a355]"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        + Add {label.slice(0, -1)}
      </button>
    </div>
  );
}

// Add this new component before the AboutPage component
function CustomSectionsManager({ sections, onSectionsChange }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSectionType, setNewSectionType] = useState('text');
  const [draggedItem, setDraggedItem] = useState(null);
  const [editingSection, setEditingSection] = useState(null);

  const sectionTypes = [
    { value: 'text', label: 'Text Section', icon: '📝', description: 'Simple text with optional heading' },
    { value: 'richtext', label: 'Rich Text', icon: '📄', description: 'Full HTML editor content' },
    { value: 'image', label: 'Image Section', icon: '🖼️', description: 'Image with caption' },
    { value: 'two_column', label: 'Two Column', icon: '📊', description: 'Side-by-side content' },
    { value: 'cards', label: 'Cards Grid', icon: '🎴', description: 'Grid of cards with icons' },
    { value: 'quote', label: 'Quote', icon: '💬', description: 'Featured quote section' },
    { value: 'cta', label: 'Call to Action', icon: '🎯', description: 'Button with message' },
    { value: 'skills_grid', label: 'Skills Grid', icon: '⭐', description: 'Grid of skills/icons' },
  ];

  const getDefaultData = (type) => {
    switch(type) {
      case 'text':
        return { heading: '', content: '' };
      case 'richtext':
        return { content: '' };
      case 'image':
        return { image_url: null, image_path: null, caption: '', alignment: 'center', content: '', };
      case 'two_column':
        return { left_content: '', right_content: '', left_image: null, right_image: null };
      case 'cards':
        return { cards: [{ title: '', description: '', icon: '', link: '' }] };
      case 'quote':
        return { text: '', author: '', background_color: '#f3f4f6' };
      case 'cta':
        return { title: '', button_text: '', button_link: '', background_color: '#1e3a8a' };
      case 'skills_grid':
        return { skills: [{ name: '', icon: '' }] };
      default:
        return {};
    }
  };

  const handleDragStart = (e, index) => {
  setDraggedItem(index);
  e.dataTransfer.effectAllowed = 'move';
};

const handleDragOver = (e, index) => {
  e.preventDefault();
  if (draggedItem === null) return;
  
  if (draggedItem !== index) {
    const newSections = [...sections];
    const draggedSection = newSections[draggedItem];
    newSections.splice(draggedItem, 1);
    newSections.splice(index, 0, draggedSection);
    
    // Update order numbers
    const reorderedSections = newSections.map((sec, idx) => ({
      ...sec,
      order: idx + 1
    }));
    
    setDraggedItem(index);
    onSectionsChange(reorderedSections);
  }
};

const handleDragEnd = async () => {
  setDraggedItem(null);
  // Save the new order to API
  const orderedIds = sections.map(s => s.id);
  try {
    await aboutAPI.reorderSections({ ids: orderedIds });
    toast.success('Sections reordered');
  } catch (error) {
    console.error('Error saving order:', error);
    toast.error('Failed to save order');
  }
};

  // Add this inside your CustomSectionsManager component, before the return statement
const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  const handleAddSection = async () => {
    const newSection = {
      type: newSectionType,
      label: `New ${sectionTypes.find(t => t.value === newSectionType)?.label}`,
      visible: true,
      data: getDefaultData(newSectionType)
    };

    try {
      const response = await aboutAPI.addCustomSection(newSection);
      onSectionsChange([...sections, response.data.data]);
      setShowAddModal(false);
      setNewSectionType('text');
      toast.success('Section added successfully');
    } catch (error) {
      console.error('Error adding section:', error);
      toast.error('Failed to add section');
    }
  };

  const handleUpdateSection = async (id, updates, isFormData = false) => {
  try {
    await aboutAPI.updateCustomSection(id, updates, isFormData);
    // Refresh sections from API to get updated image_url
    const response = await aboutAPI.getAbout();
    const data = response.data.data || response.data;
    onSectionsChange(data.custom_sections || []);
    toast.success('Section updated');
  } catch (error) {
    console.error('Error updating section:', error);
    toast.error('Failed to update section');
  }
};

  const handleDeleteSection = async (id) => {
    if (!confirm('Delete this section?')) return;
    try {
      await aboutAPI.deleteCustomSection(id);
      const updatedSections = sections.filter(s => s.id !== id);
      onSectionsChange(updatedSections);
      toast.success('Section deleted');
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  };

  const handleReorder = async (newOrder) => {
    const orderedIds = newOrder.map(s => s.id);
    try {
      await aboutAPI.reorderSections({ ids: orderedIds });
      onSectionsChange(newOrder);
      toast.success('Sections reordered');
    } catch (error) {
      console.error('Error reordering sections:', error);
      toast.error('Failed to reorder sections');
    }
  };

  const SectionEditor = ({ section, onUpdate, onDelete }) => {
    const [localData, setLocalData] = useState(section.data);
    const [label, setLabel] = useState(section.label);
    const [visible, setVisible] = useState(section.visible);

   const handleSave = async () => {
      try {
        if (localData._imageFile) {
          // Has a new image — send as FormData
          const formData = new FormData();
          formData.append('label', label);
          formData.append('visible', visible ? '1' : '0');
          formData.append('image', localData._imageFile);

          const { _imageFile, ...cleanData } = localData;
          formData.append('data', JSON.stringify(cleanData));

          await onUpdate(section.id, formData);
        } else {
          // No image — send as plain JSON
          await onUpdate(section.id, { label, visible, data: localData });
        }
        setEditingSection(null);
      } catch (err) {
        console.error(err);
        toast.error('Failed to save section');
      }
    };

    const renderDataEditor = () => {
      switch(section.type) {
        case 'text':
          return (
            <div className="space-y-3">
              <input
                type="text"
                value={localData.heading || ''}
                onChange={(e) => setLocalData({ ...localData, heading: e.target.value })}
                placeholder="Heading"
                className={inputClass}
              />
              <textarea
                value={localData.content || ''}
                onChange={(e) => setLocalData({ ...localData, content: e.target.value })}
                placeholder="Content"
                rows={5}
                className={inputClass}
              />
            </div>
          );
        case 'richtext':
          return (
            <RichTextEditor
              value={localData.content || ''}
              onChange={(value) => setLocalData({ ...localData, content: value })}
              placeholder="Write your content here..."
              height={300}
            />
          );
       case 'image':
  return (
    <div className="space-y-3">
      <ImageUpload
        label="Section Image"
        existingImage={`https://api.osarenemokpae.com/storage/${localData.image_path}`}
         onImageChange={(file) => {
          if (file) {
            // Store file temporarily — uploaded when Save is clicked
            setLocalData({ ...localData, _imageFile: file });
          } else {
            const { _imageFile, ...rest } = localData;
            setLocalData({ ...rest, image_url: null, image_path: null });
          }
        }}
      />
      
      {/* ADD THIS: Content field so you can actually write text next to the image */}
      <div>
        <label className="block text-xs text-gray-600 font-medium mb-1.5">Section Content (Next to Image)</label>
        <textarea
          value={localData.content || ''}
          onChange={(e) => setLocalData({ ...localData, content: e.target.value })}
          placeholder="Write the text that will appear on the right side of the image..."
          rows={5}
          className={inputClass}
        />
      </div>

      <input
        type="text"
        value={localData.caption || ''}
        onChange={(e) => setLocalData({ ...localData, caption: e.target.value })}
        placeholder="Image Caption (e.g. Dr. Name)"
        className={inputClass}
      />
      
      <select
        value={localData.alignment || 'center'}
        onChange={(e) => setLocalData({ ...localData, alignment: e.target.value })}
        className={inputClass}
      >
        <option value="left">Image on Left</option>
        <option value="right">Image on Right</option>
      </select>
    </div>
  );
        case 'two_column':
          return (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Left Content</label>
                <textarea
                  value={localData.left_content || ''}
                  onChange={(e) => setLocalData({ ...localData, left_content: e.target.value })}
                  rows={5}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Right Content</label>
                <textarea
                  value={localData.right_content || ''}
                  onChange={(e) => setLocalData({ ...localData, right_content: e.target.value })}
                  rows={5}
                  className={inputClass}
                />
              </div>
            </div>
          );
        case 'cards':
          return (
            <ArrayField
              label="Cards"
              items={localData.cards || []}
              onItemsChange={(items) => setLocalData({ ...localData, cards: items })}
              itemFields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
                { name: 'icon', label: 'Icon URL', type: 'text' },
                { name: 'link', label: 'Link URL', type: 'text' }
              ]}
            />
          );
        case 'quote':
          return (
            <div className="space-y-3">
              <textarea
                value={localData.text || ''}
                onChange={(e) => setLocalData({ ...localData, text: e.target.value })}
                placeholder="Quote text"
                rows={3}
                className={inputClass}
              />
              <input
                type="text"
                value={localData.author || ''}
                onChange={(e) => setLocalData({ ...localData, author: e.target.value })}
                placeholder="Author"
                className={inputClass}
              />
              <input
                type="color"
                value={localData.background_color || '#f3f4f6'}
                onChange={(e) => setLocalData({ ...localData, background_color: e.target.value })}
                className="w-full h-10"
              />
            </div>
          );
        case 'cta':
          return (
            <div className="space-y-3">
              <input
                type="text"
                value={localData.title || ''}
                onChange={(e) => setLocalData({ ...localData, title: e.target.value })}
                placeholder="Title"
                className={inputClass}
              />
              <input
                type="text"
                value={localData.button_text || ''}
                onChange={(e) => setLocalData({ ...localData, button_text: e.target.value })}
                placeholder="Button Text"
                className={inputClass}
              />
              <input
                type="text"
                value={localData.button_link || ''}
                onChange={(e) => setLocalData({ ...localData, button_link: e.target.value })}
                placeholder="Button Link"
                className={inputClass}
              />
              <input
                type="color"
                value={localData.background_color || '#1e3a8a'}
                onChange={(e) => setLocalData({ ...localData, background_color: e.target.value })}
                className="w-full h-10"
              />
            </div>
          );
        case 'skills_grid':
          return (
            <ArrayField
              label="Skills"
              items={localData.skills || []}
              onItemsChange={(items) => setLocalData({ ...localData, skills: items })}
              itemFields={[
                { name: 'name', label: 'Skill Name', type: 'text' },
                { name: 'icon', label: 'Icon URL', type: 'text' }
              ]}
            />
          );
        default:
          return <div>Unknown section type</div>;
      }
    };

    return (
      <div className="border-2 border-blue-300 rounded-lg p-4 mb-4 bg-blue-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="text-lg font-semibold border rounded px-2 py-1"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
              />
              <span className="text-sm">Visible</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
            <button onClick={() => setEditingSection(null)} className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>
            <button onClick={() => onDelete(section.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
        {renderDataEditor()}
      </div>
    );
  };

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Custom Sections</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Section
        </button>
      </div>

      {/* Sortable Sections List */}
      {/* Sortable Sections List */}
<div className="space-y-3">
  {sections.map((section, idx) => (
    <div
      key={section.id}
      draggable
      onDragStart={(e) => handleDragStart(e, idx)}
      onDragOver={(e) => handleDragOver(e, idx)}
      onDragEnd={handleDragEnd}
      className={`border rounded-lg p-4 bg-white shadow-sm cursor-move transition-all ${
        draggedItem === idx ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Rest of your section display code - keep as is */}
      {editingSection === section.id ? (
        <SectionEditor
          section={section}
          onUpdate={handleUpdateSection}
          onDelete={handleDeleteSection}
        />
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 cursor-grab">⋮⋮</span>
              <h4 className="font-semibold">{section.label}</h4>
              <span className="text-xs px-2 py-1 bg-gray-200 rounded">{section.type}</span>
              {!section.visible && <span className="text-xs text-red-500">Hidden</span>}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {section.type === 'text' && section.data?.heading && <span>Heading: {section.data.heading}</span>}
              {section.type === 'quote' && section.data?.text && <span>"{section.data.text.substring(0, 50)}..."</span>}
              {section.type === 'cards' && <span>{section.data?.cards?.length || 0} cards</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingSection(section.id)}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteSection(section.id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  ))}
</div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Section</h3>
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value)}
              className={inputClass + " mb-4"}
            >
              {sectionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label} - {type.description}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    // Hero Section
    hero_headline: "",
    hero_subtext: "",
    
    // Brand Story
    brand_story: "",
    academic_biography: "",
    apostle_biography: "",
    apostle_name: "",
    
    // Missions
    mission_statement_1: "",
    mission_statement_2: "",
    mission_statement_3: "",
    track_record_title: "",
    track_record_description: "",
    
    // NEW: Academic Profile
    phd_degrees: [],
    post_doctoral_degrees: [],
    location: "",
    email: "",
    
    // NEW: Education
    education: [],
    
    // NEW: Passion
    passion: "",
    
    // NEW: Additional Text
    additional_text: [],
    
    // NEW: Top Skills
    top_skills: [],
    
    // Social Links
    youtube_link: "",
    linkedin_link: "",
    custom_sections: []
  });

  const [heroImage, setHeroImage] = useState(null);
  const [apostleImage, setApostleImage] = useState(null);
  const [existingHeroImage, setExistingHeroImage] = useState("");
  const [existingApostleImage, setExistingApostleImage] = useState("");

  // Fetch existing data on load
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await aboutAPI.getAbout();
        const data = response.data.data || response.data;
        
        if (data) {
          setForm({
            hero_headline: data.hero_section?.headline || "",
            hero_subtext: data.hero_section?.subtext || "",
            brand_story: data.brand_story?.brand_story || "",
            academic_biography: data.brand_story?.academic_biography || "",
            apostle_biography: data.brand_story?.apostle_biography || "",
            apostle_name: data.brand_story?.apostle?.name || "",
            mission_statement_1: data.missions?.mission_statement_1 || "",
            mission_statement_2: data.missions?.mission_statement_2 || "",
            mission_statement_3: data.missions?.mission_statement_3 || "",
            track_record_title: data.missions?.track_record?.title || "",
            track_record_description: data.missions?.track_record?.description || "",
            // NEW fields
            phd_degrees: data.academic_profile?.phd_degrees || [],
            post_doctoral_degrees: data.academic_profile?.post_doctoral_degrees || [],
            location: data.academic_profile?.location || "",
            email: data.academic_profile?.email || "",
            education: data.education || [],
            passion: data.passion || "",
            additional_text: data.additional_text || [],
            top_skills: data.top_skills || [],
            youtube_link: data.youtube_link || "",
            custom_sections: data.custom_sections || [],
            linkedin_link: data.linkedin_link || ""
          });
          
          setExistingHeroImage(data.hero_section?.background_image_path || "");
          setExistingApostleImage(data.brand_story?.apostle?.image || "");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        toast.error("Failed to load about data");
      } finally {
        setFetching(false);
      }
    };
    
    fetchAboutData();
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Basic fields
      formData.append("hero_headline", form.hero_headline);
      formData.append("hero_subtext", form.hero_subtext);
      formData.append("brand_story", form.brand_story);
      formData.append("academic_biography", form.academic_biography);
      formData.append("apostle_biography", form.apostle_biography);
      formData.append("apostle_name", form.apostle_name);
      formData.append("mission_statement_1", form.mission_statement_1);
      formData.append("mission_statement_2", form.mission_statement_2);
      formData.append("mission_statement_3", form.mission_statement_3);
      formData.append("track_record_title", form.track_record_title);
      formData.append("track_record_description", form.track_record_description);
      formData.append("youtube_link", form.youtube_link);
      formData.append("linkedin_link", form.linkedin_link);
      
      // NEW: Academic Profile
      formData.append("location", form.location);
      formData.append("email", form.email);
      formData.append("phd_degrees", JSON.stringify(form.phd_degrees));
      formData.append("post_doctoral_degrees", JSON.stringify(form.post_doctoral_degrees));
      
      // NEW: Education
      formData.append("education", JSON.stringify(form.education));
      
      // NEW: Passion
      formData.append("passion", form.passion);
      
      // NEW: Additional Text
      formData.append("additional_text", JSON.stringify(form.additional_text));
      
      // NEW: Top Skills
      formData.append("top_skills", JSON.stringify(form.top_skills));
      
      // Images
      if (heroImage) {
        formData.append("hero_background_image", heroImage);
      }
      if (apostleImage) {
        formData.append("apostle_image", apostleImage);
      }
      
      await aboutAPI.updateAbout(formData);
      toast.success("About page published successfully!");
      
      // Refresh data
      const response = await aboutAPI.getAbout();
      const data = response.data.data || response.data;
      
      if (data) {
        setForm({
          hero_headline: data.hero_section?.headline || "",
          hero_subtext: data.hero_section?.subtext || "",
          brand_story: data.brand_story?.brand_story || "",
          academic_biography: data.brand_story?.academic_biography || "",
          apostle_biography: data.brand_story?.apostle_biography || "",
          apostle_name: data.brand_story?.apostle?.name || "",
          mission_statement_1: data.missions?.mission_statement_1 || "",
          mission_statement_2: data.missions?.mission_statement_2 || "",
          mission_statement_3: data.missions?.mission_statement_3 || "",
          track_record_title: data.missions?.track_record?.title || "",
          track_record_description: data.missions?.track_record?.description || "",
          phd_degrees: data.academic_profile?.phd_degrees || [],
          post_doctoral_degrees: data.academic_profile?.post_doctoral_degrees || [],
          location: data.academic_profile?.location || "",
          email: data.academic_profile?.email || "",
          education: data.education || [],
          passion: data.passion || "",
          additional_text: data.additional_text || [],
          top_skills: data.top_skills || [],
          youtube_link: data.youtube_link || "",
          linkedin_link: data.linkedin_link || ""
        });
        
        setExistingHeroImage(data.hero_section?.background_image_path || "");
        setExistingApostleImage(data.brand_story?.apostle?.image || "");
      }
      
      setHeroImage(null);
      setApostleImage(null);
      
    } catch (error) {
      console.error("Error publishing about:", error);
      toast.error(error.response?.data?.message || "Failed to publish about page");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset about page to default settings?")) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("hero_headline", "");
      formData.append("hero_subtext", "");
      formData.append("brand_story", "");
      formData.append("academic_biography", "");
      formData.append("apostle_biography", "");
      formData.append("apostle_name", "");
      formData.append("mission_statement_1", "");
      formData.append("mission_statement_2", "");
      formData.append("mission_statement_3", "");
      formData.append("track_record_title", "");
      formData.append("track_record_description", "");
      formData.append("youtube_link", "");
      formData.append("linkedin_link", "");
      formData.append("location", "");
      formData.append("email", "");
      formData.append("phd_degrees", JSON.stringify([]));
      formData.append("post_doctoral_degrees", JSON.stringify([]));
      formData.append("education", JSON.stringify([]));
      formData.append("passion", "");
      formData.append("additional_text", JSON.stringify([]));
      formData.append("top_skills", JSON.stringify([]));
      formData.append("custom_sections", JSON.stringify([]));
      
      await aboutAPI.updateAbout(formData);
      
      setForm({
        hero_headline: "",
        hero_subtext: "",
        brand_story: "",
        academic_biography: "",
        apostle_biography: "",
        apostle_name: "",
        mission_statement_1: "",
        mission_statement_2: "",
        mission_statement_3: "",
        track_record_title: "",
        track_record_description: "",
        phd_degrees: [],
        post_doctoral_degrees: [],
        location: "",
        email: "",
        education: [],
        passion: "",
        additional_text: [],
        top_skills: [],
        youtube_link: "",
        linkedin_link: ""
      });
      
      setHeroImage(null);
      setApostleImage(null);
      setExistingHeroImage("");
      setExistingApostleImage("");
      
      toast.success("About page reset to default!");
    } catch (error) {
      console.error("Error resetting about:", error);
      toast.error("Failed to reset about page");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all";

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading about page data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
        <p className="text-[15px] font-semibold text-[#1a1612]">
          About Page Settings
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6 pb-16">
            
            {/* Hero Section */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Hero Section</p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Headline</label>
              <input
                type="text"
                value={form.hero_headline}
                onChange={(e) => handleChange("hero_headline", e.target.value)}
                placeholder="Enter hero headline"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Subtext</label>
              <textarea
                value={form.hero_subtext}
                onChange={(e) => handleChange("hero_subtext", e.target.value)}
                rows={4}
                placeholder="Enter hero subtext"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)] transition-all resize-none"
              />
            </div>

            <ImageUpload 
              label="Hero Background Image" 
              onImageChange={setHeroImage}
              existingImage={existingHeroImage}
            />

            {/* Social Media Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">YouTube Link</label>
                <input
                  type="text"
                  value={form.youtube_link}
                  onChange={(e) => handleChange("youtube_link", e.target.value)}
                  placeholder="https://www.youtube.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 font-medium mb-1.5">LinkedIn Link</label>
                <input
                  type="text"
                  value={form.linkedin_link}
                  onChange={(e) => handleChange("linkedin_link", e.target.value)}
                  placeholder="https://www.linkedin.com/..."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Brand Story */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Brand Story</label>
              <RichTextEditor
                value={form.brand_story}
                onChange={(value) => handleChange("brand_story", value)}
                placeholder="Write the brand story here..."
                height={200}
              />
            </div>

            {/* Apostle Section */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Apostle Information</p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Apostle Name</label>
              <input
                type="text"
                value={form.apostle_name}
                onChange={(e) => handleChange("apostle_name", e.target.value)}
                placeholder="Enter apostle name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Academic Biography</label>
              <RichTextEditor
                value={form.academic_biography}
                onChange={(value) => handleChange("academic_biography", value)}
                placeholder="Write the academic biography here..."
                height={300}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Apostle Biography</label>
              <RichTextEditor
                value={form.apostle_biography}
                onChange={(value) => handleChange("apostle_biography", value)}
                placeholder="Write the apostle biography here..."
                height={300}
              />
            </div>

            <ImageUpload 
              label="Apostle Image" 
              onImageChange={setApostleImage}
              existingImage={existingApostleImage}
            />

            {/* NEW: Academic Profile Section */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Academic Profile</p>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-600 font-medium mb-1.5">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter location"
                  className={inputClass}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-600 font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className={inputClass}
                />
              </div>

              <ArrayField
                label="PhD Degrees"
                items={form.phd_degrees}
                onItemsChange={(items) => handleChange("phd_degrees", items)}
                itemFields={[
                  { name: "title", label: "Title", placeholder: "e.g., Ph.D in Political Economic Management", type: "text" },
                  { name: "institution", label: "Institution", placeholder: "e.g., University of Century", type: "text" }
                ]}
              />

              <ArrayField
                label="Post Doctoral Degrees"
                items={form.post_doctoral_degrees}
                onItemsChange={(items) => handleChange("post_doctoral_degrees", items)}
                itemFields={[
                  { name: "title", label: "Title", placeholder: "e.g., Business Diversification", type: "text" },
                  { name: "institution", label: "Institution", placeholder: "e.g., Oxford University", type: "text" }
                ]}
              />
            </div>

            {/* NEW: Education Section */}
            <div>
              <ArrayField
                label="Education"
                items={form.education}
                onItemsChange={(items) => handleChange("education", items)}
                itemFields={[
                  { name: "title", label: "Degree/Certificate", placeholder: "e.g., Christian Leadership", type: "text" },
                  { name: "institution", label: "Institution", placeholder: "e.g., Haggai Institute Hawaii", type: "text" }
                ]}
              />
            </div>

            {/* NEW: Passion Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Passion</label>
              <input
                type="text"
                value={form.passion}
                onChange={(e) => handleChange("passion", e.target.value)}
                placeholder="e.g., Monitoring the next generation of leaders"
                className={inputClass}
              />
            </div>

            {/* Mission Statements */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">Mission Statements</p>
              <label className="block text-xs text-gray-600 font-medium mb-1.5">Mission Statement 1</label>
              <RichTextEditor
                value={form.mission_statement_1}
                onChange={(value) => handleChange("mission_statement_1", value)}
                placeholder="Enter first mission statement..."
                height={250}
              />
            </div>

            {/* Track Record Section */}
            <div>
              <p className="text-md font-semibold text-gray-900 mb-4">Track Record</p>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Track Record Title</label>
              <input
                type="text"
                value={form.track_record_title}
                onChange={(e) => handleChange("track_record_title", e.target.value)}
                placeholder="Enter track record title"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Track Record Description</label>
              <RichTextEditor
                value={form.track_record_description}
                onChange={(value) => handleChange("track_record_description", value)}
                placeholder="Enter track record description with bullet points, etc..."
                height={300}
              />
            </div>

            {/* NEW: Additional Text Section */}
            <div>
              <ArrayField
                label="Additional Text Lines"
                items={form.additional_text}
                onItemsChange={(items) => handleChange("additional_text", items)}
                itemFields={[
                  { name: "text", label: "Text Line", placeholder: "Enter text line...", type: "textarea", rows: 2 }
                ]}
              />
            </div>

            {/* NEW: Top Skills Section */}
            <div>
              <ArrayField
                label="Top Skills"
                items={form.top_skills}
                onItemsChange={(items) => handleChange("top_skills", items)}
                itemFields={[
                  { name: "icon", label: "Icon Name", placeholder: "e.g., monitoring.png", type: "text" },
                  { name: "name", label: "Skill Name", placeholder: "e.g., Mentoring", type: "text" }
                ]}
              />
            </div>

            {/* Custom Sections */}
            <CustomSectionsManager 
              sections={form.custom_sections || []}
              onSectionsChange={(sections) => handleChange('custom_sections', sections)}
            />

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-semibold text-black tracking-widest uppercase mb-4">Actions</p>
              <div className="space-y-3">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold bg-[#DCFCE7] text-gray-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish Changes"}
                </button>
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold bg-[#FECACA] text-gray-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset to Default"}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-5">
              <p className="text-xs font-semibold text-blue-900 uppercase mb-3">Tips</p>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>• Use the toolbar to format your content</li>
                <li>• Create bullet or numbered lists easily</li>
                <li>• Add headings, quotes, and more</li>
                <li>• All formatting is saved as clean HTML</li>
                <li>• You can add/remove items from lists dynamically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rich-text-editor :global(.ProseMirror) {
          min-height: 200px;
          padding: 1rem;
          outline: none;
        }
        .rich-text-editor :global(.ProseMirror p) {
          margin-bottom: 0.75rem;
        }
           .cursor-grab {
    cursor: grab;
  }
  .cursor-grab:active {
    cursor: grabbing;
  }
        .rich-text-editor :global(.ProseMirror ul),
        .rich-text-editor :global(.ProseMirror ol) {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-editor :global(.ProseMirror h2) {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .rich-text-editor :global(.ProseMirror h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .rich-text-editor :global(.ProseMirror blockquote) {
          border-left: 3px solid #c5a355;
          padding-left: 1rem;
          font-style: italic;
          color: #666;
        }
      `}</style>
    </div>
  );
}