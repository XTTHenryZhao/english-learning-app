// 教材句型学习页面
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Typography, Select, Input, List, Tag, Divider, message } from 'antd';
import { ArrowLeftOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { textbookSentences, TextbookSentence } from '../data/textbookSentences.ts';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const TextbookPage: React.FC = () => {
  const navigate = useNavigate();
  const [filteredSentences, setFilteredSentences] = useState<TextbookSentence[]>([]);
  const [selectedTextbook, setSelectedTextbook] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // 获取所有教材句子
  useEffect(() => {
    setFilteredSentences(textbookSentences);
  }, []);

  // 筛选句子
  const filterSentences = useCallback(() => {
    let filtered = textbookSentences;

    if (selectedTextbook !== 'all') {
      filtered = filtered.filter(s => s.textbook === selectedTextbook);
    }

    if (selectedGrade !== 'all') {
      filtered = filtered.filter(s => s.grade === selectedGrade);
    }

    if (selectedUnit !== 'all') {
      filtered = filtered.filter(s => s.unit === selectedUnit);
    }

    if (searchText) {
      filtered = filtered.filter(s => 
        s.english.toLowerCase().includes(searchText.toLowerCase()) ||
        s.chinese.includes(searchText) ||
        s.keyPoint.includes(searchText)
      );
    }

    setFilteredSentences(filtered);
  }, [selectedTextbook, selectedGrade, selectedUnit, searchText]);

  // 当筛选条件改变时自动筛选
  useEffect(() => {
    filterSentences();
  }, [selectedTextbook, selectedGrade, selectedUnit, searchText, filterSentences]);

  // 获取唯一的教材版本
  const textbooks = Array.from(new Set(textbookSentences.map(s => s.textbook)));
  const grades = Array.from(new Set(textbookSentences.map(s => s.grade)));
  const units = Array.from(new Set(textbookSentences.map(s => s.unit)));

  // 标记句子为已学会
  const markAsLearned = (sentenceId: number) => {
    // 这里应该调用store的方法来标记句子
    message.success('已标记为学会！');
  };

  return (
    <div className="app">
      <header className="app-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          style={{ color: 'white' }}
        >
          返回
        </Button>
        <h1 className="app-title">教材句型</h1>
        <div style={{ color: 'white' }}>
          <BookOutlined style={{ marginRight: '0.5rem' }} />
          同步课堂内容
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            教材重点句型学习
          </Title>
          
          <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            收录主流教材重点句型，标注出处和语法解析，方便同步巩固课堂内容
          </Paragraph>

          {/* 筛选器 */}
          <Card title="筛选条件" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <Text strong>教材版本：</Text>
                <Select
                  value={selectedTextbook}
                  onChange={setSelectedTextbook}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Option value="all">全部版本</Option>
                  {textbooks.map(textbook => (
                    <Option key={textbook} value={textbook}>{textbook}</Option>
                  ))}
                </Select>
              </div>
              
              <div>
                <Text strong>年级：</Text>
                <Select
                  value={selectedGrade}
                  onChange={setSelectedGrade}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Option value="all">全部年级</Option>
                  {grades.map(grade => (
                    <Option key={grade} value={grade}>{grade}</Option>
                  ))}
                </Select>
              </div>
              
              <div>
                <Text strong>单元：</Text>
                <Select
                  value={selectedUnit}
                  onChange={setSelectedUnit}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Option value="all">全部单元</Option>
                  {units.map(unit => (
                    <Option key={unit} value={unit}>{unit}</Option>
                  ))}
                </Select>
              </div>
            </div>
            
            <Search
              placeholder="搜索句型、语法点或中文含义"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Card>

          {/* 统计信息 */}
          <Card style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              <div>
                <Title level={3} style={{ color: '#667eea' }}>{filteredSentences.length}</Title>
                <Text>当前筛选结果</Text>
              </div>
              <div>
                <Title level={3} style={{ color: '#52c41a' }}>{textbookSentences.length}</Title>
                <Text>总句型数</Text>
              </div>
              <div>
                <Title level={3} style={{ color: '#fa8c16' }}>{textbooks.length}</Title>
                <Text>教材版本</Text>
              </div>
            </div>
          </Card>

          {/* 句型列表 */}
          <Card title={`句型列表 (${filteredSentences.length}句)`}>
            <List
              dataSource={filteredSentences}
              renderItem={(sentence) => (
                <List.Item
                  actions={[
                    <Button 
                      key="learn" 
                      type="primary" 
                      size="small"
                      onClick={() => markAsLearned(sentence.id)}
                    >
                      标记学会
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <Text strong style={{ fontSize: '1.1rem' }}>{sentence.english}</Text>
                        <div style={{ marginTop: '0.5rem' }}>
                          <Tag color="blue">{sentence.textbook}</Tag>
                          <Tag color="green">{sentence.grade}</Tag>
                          <Tag color="orange">{sentence.semester}</Tag>
                          <Tag color="purple">{sentence.unit}</Tag>
                          {sentence.lesson && <Tag color="cyan">{sentence.lesson}</Tag>}
                        </div>
                      </div>
                    }
                    description={
                      <div>
                        <Paragraph style={{ marginBottom: '0.5rem' }}>
                          <Text type="secondary">{sentence.chinese}</Text>
                        </Paragraph>
                        
                        <Divider style={{ margin: '0.5rem 0' }} />
                        
                        <div style={{ marginBottom: '0.5rem' }}>
                          <Text strong>重点句型：</Text>
                          <Tag color="red">{sentence.keyPoint}</Tag>
                        </div>
                        
                        <div style={{ marginBottom: '0.5rem' }}>
                          <Text strong>语法解析：</Text>
                          <Text>{sentence.explanation}</Text>
                        </div>
                        
                        <div>
                          <Text strong>适用考试：</Text>
                          {sentence.examType?.map(exam => (
                            <Tag key={exam} color="volcano">{exam}</Tag>
                          ))}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TextbookPage; 