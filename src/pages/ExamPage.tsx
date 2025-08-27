// 考试得分句学习页面
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Typography, Select, Input, List, Tag, Divider, message, Row, Col } from 'antd';
import { ArrowLeftOutlined, TrophyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { examSentences, ExamSentence } from '../data/examSentences.ts';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const [filteredSentences, setFilteredSentences] = useState<ExamSentence[]>([]);
  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [selectedSentenceType, setSelectedSentenceType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // 获取所有考试句子
  useEffect(() => {
    setFilteredSentences(examSentences);
  }, []);

  // 筛选句子
  const filterSentences = useCallback(() => {
    let filtered = examSentences;

    if (selectedExamType !== 'all') {
      filtered = filtered.filter(s => s.examType.includes(selectedExamType));
    }

    if (selectedSentenceType !== 'all') {
      filtered = filtered.filter(s => s.sentenceType === selectedSentenceType);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(s => s.difficulty === selectedDifficulty);
    }

    if (searchText) {
      filtered = filtered.filter(s => 
        s.english.toLowerCase().includes(searchText.toLowerCase()) ||
        s.chinese.includes(searchText) ||
        s.grammarPoint.includes(searchText) ||
        s.explanation.includes(searchText)
      );
    }

    setFilteredSentences(filtered);
  }, [selectedExamType, selectedSentenceType, selectedDifficulty, searchText]);

  // 当筛选条件改变时自动筛选
  useEffect(() => {
    filterSentences();
  }, [selectedExamType, selectedSentenceType, selectedDifficulty, searchText, filterSentences]);

  // 获取唯一的值
  const examTypes = Array.from(new Set(examSentences.flatMap(s => s.examType)));
  const sentenceTypes = Array.from(new Set(examSentences.map(s => s.sentenceType)));
  const difficulties = ['青铜', '白银', '黄金', '钻石'];

  // 标记句子为已学会
  const markAsLearned = (sentenceId: number) => {
    // 这里应该调用store的方法来标记句子
    message.success('已标记为学会！');
  };

  // 获取统计信息
  const getStats = () => {
    const total = examSentences.length;
    const writingCount = examSentences.filter(s => s.sentenceType === '写作衔接句').length;
    const readingCount = examSentences.filter(s => s.sentenceType === '阅读长难句').length;
    
    return { total, writingCount, readingCount };
  };

  const stats = getStats();

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
        <h1 className="app-title">考试得分句</h1>
        <div style={{ color: 'white' }}>
          <TrophyOutlined style={{ marginRight: '0.5rem' }} />
          掌握考试要点
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            考试得分句学习
          </Title>
          
          <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            提炼写作衔接句和阅读长难句，掌握语法要点，提升考试得分能力
          </Paragraph>

          {/* 筛选器 */}
          <Card title="筛选条件" style={{ marginBottom: '2rem' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <div>
                  <Text strong>考试类型：</Text>
                  <Select
                    value={selectedExamType}
                    onChange={setSelectedExamType}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    <Option value="all">全部考试</Option>
                    {examTypes.map(exam => (
                      <Option key={exam} value={exam}>{exam}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <div>
                  <Text strong>句子类型：</Text>
                  <Select
                    value={selectedSentenceType}
                    onChange={setSelectedSentenceType}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    <Option value="all">全部类型</Option>
                    {sentenceTypes.map(type => (
                      <Option key={type} value={type}>{type}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <div>
                  <Text strong>难度等级：</Text>
                  <Select
                    value={selectedDifficulty}
                    onChange={setSelectedDifficulty}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    <Option value="all">全部难度</Option>
                    {difficulties.map(diff => (
                      <Option key={diff} value={diff}>{diff}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
            </Row>
            
            <Search
              placeholder="搜索句型、语法点或解析内容"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%', marginTop: '1rem' }}
            />
          </Card>

          {/* 统计信息 */}
          <Card style={{ marginBottom: '2rem' }}>
            <Row gutter={16} style={{ textAlign: 'center' }}>
              <Col xs={8}>
                <Title level={3} style={{ color: '#667eea' }}>{filteredSentences.length}</Title>
                <Text>当前筛选结果</Text>
              </Col>
              <Col xs={8}>
                <Title level={3} style={{ color: '#52c41a' }}>{stats.total}</Title>
                <Text>总得分句数</Text>
              </Col>
              <Col xs={8}>
                <Title level={3} style={{ color: '#fa8c16' }}>{examTypes.length}</Title>
                <Text>考试类型</Text>
              </Col>
            </Row>
            
            <Divider />
            
            <Row gutter={16} style={{ textAlign: 'center' }}>
              <Col xs={12}>
                <Title level={4} style={{ color: '#722ed1' }}>{stats.writingCount}</Title>
                <Text>写作衔接句</Text>
              </Col>
              <Col xs={12}>
                <Title level={4} style={{ color: '#eb2f96' }}>{stats.readingCount}</Title>
                <Text>阅读长难句</Text>
              </Col>
            </Row>
          </Card>

          {/* 句子列表 */}
          <Card title={`得分句列表 (${filteredSentences.length}句)`}>
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
                          <Tag color="blue">{sentence.sentenceType}</Tag>
                          <Tag color="green">{sentence.difficulty}</Tag>
                          {sentence.examType.map(exam => (
                            <Tag key={exam} color="orange">{exam}</Tag>
                          ))}
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
                          <Text strong>语法要点：</Text>
                          <Tag color="red">{sentence.grammarPoint}</Tag>
                        </div>
                        
                        <div style={{ marginBottom: '0.5rem' }}>
                          <Text strong>详细解析：</Text>
                          <Text>{sentence.explanation}</Text>
                        </div>
                        
                        <div>
                          <Text strong>使用场景：</Text>
                          <Text>{sentence.usage}</Text>
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

export default ExamPage; 