// 句子逻辑剖析页面
import React, { useState } from 'react';
import { Button, Card, Typography, List, Tag } from 'antd';
import { ArrowLeftOutlined, BranchesOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import analysisSentences, { SentenceAnalysis } from '../data/analysisSentences.ts';

const { Title, Paragraph, Text } = Typography;



interface SentenceStructure {
  mainClause: string;
  subordinateClauses: SubordinateClause[];
  phrases: Phrase[];
  words: Word[];
}

interface SubordinateClause {
  type: string;
  content: string;
  function: string;
  connector: string;
}

interface Phrase {
  type: string;
  content: string;
  function: string;
}

interface Word {
  word: string;
  partOfSpeech: string;
  function: string;
}

interface LogicRelation {
  type: string;
  description: string;
  examples: string[];
}

interface SimilarPattern {
  pattern: string;
  examples: string[];
  usage: string;
}

interface GrammarPoint {
  point: string;
  explanation: string;
  examples: string[];
}

const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSentence, setSelectedSentence] = useState<SentenceAnalysis | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'structure' | 'logic' | 'grammar'>('structure');

  // 使用导入的句子分析数据
  const sentenceAnalyses: SentenceAnalysis[] = analysisSentences;

  // 渲染句子结构分析
  const renderStructureAnalysis = (analysis: SentenceAnalysis) => (
    <div>
      <Title level={3}>句子结构分析</Title>
      
      <Card title="主句" style={{ marginBottom: '1rem' }}>
        <Text style={{ fontSize: '1.1rem', color: '#333' }}>
          {analysis.structure.mainClause}
        </Text>
      </Card>

      {analysis.structure.subordinateClauses.length > 0 && (
        <Card title="从句分析" style={{ marginBottom: '1rem' }}>
          {analysis.structure.subordinateClauses.map((clause, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <Tag color="blue">{clause.type}</Tag>
              <Text style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                {clause.content}
              </Text>
              <div style={{ marginTop: '0.5rem', color: '#666' }}>
                <Text>功能：{clause.function}</Text>
              </div>
              <div style={{ color: '#666' }}>
                <Text>连接词：{clause.connector}</Text>
              </div>
            </div>
          ))}
        </Card>
      )}

      <Card title="短语分析" style={{ marginBottom: '1rem' }}>
        {analysis.structure.phrases.map((phrase, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <Tag color="green">{phrase.type}</Tag>
            <Text style={{ marginLeft: '0.5rem' }}>{phrase.content}</Text>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              功能：{phrase.function}
            </div>
          </div>
        ))}
      </Card>

      <Card title="词汇分析">
        {analysis.structure.words.map((word, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <Text strong>{word.word}</Text>
            <Tag color="purple" style={{ marginLeft: '0.5rem' }}>{word.partOfSpeech}</Tag>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              功能：{word.function}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );

  // 渲染逻辑关系分析
  const renderLogicAnalysis = (analysis: SentenceAnalysis) => (
    <div>
      <Title level={3}>逻辑关系分析</Title>
      
      {analysis.logicRelations.map((relation, index) => (
        <Card key={index} title={relation.type} style={{ marginBottom: '1rem' }}>
          <Paragraph style={{ marginBottom: '1rem' }}>
            {relation.description}
          </Paragraph>
          
          <div>
            <Text strong>类似表达：</Text>
            <List
              dataSource={relation.examples}
              renderItem={(example) => (
                <List.Item>
                  <Text>{example}</Text>
                </List.Item>
              )}
            />
          </div>
        </Card>
      ))}
    </div>
  );

  // 渲染语法要点分析
  const renderGrammarAnalysis = (analysis: SentenceAnalysis) => (
    <div>
      <Title level={3}>语法要点分析</Title>
      
      {analysis.grammarPoints.map((point, index) => (
        <Card key={index} title={point.point} style={{ marginBottom: '1rem' }}>
          <Paragraph style={{ marginBottom: '1rem' }}>
            {point.explanation}
          </Paragraph>
          
          <div>
            <Text strong>例句：</Text>
            <List
              dataSource={point.examples}
              renderItem={(example) => (
                <List.Item>
                  <Text>{example}</Text>
                </List.Item>
              )}
            />
          </div>
        </Card>
      ))}
    </div>
  );

  // 渲染相似句型
  const renderSimilarPatterns = (analysis: SentenceAnalysis) => (
    <div>
      <Title level={3}>相似句型</Title>
      
      {analysis.similarPatterns.map((pattern, index) => (
        <Card key={index} title={`句型 ${index + 1}`} style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Text strong>句型结构：</Text>
            <div style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '0.5rem', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              marginTop: '0.5rem'
            }}>
              {pattern.pattern}
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <Text strong>使用说明：</Text>
            <Paragraph style={{ marginTop: '0.5rem' }}>
              {pattern.usage}
            </Paragraph>
          </div>
          
          <div>
            <Text strong>例句：</Text>
            <List
              dataSource={pattern.examples}
              renderItem={(example) => (
                <List.Item>
                  <Text>{example}</Text>
                </List.Item>
              )}
            />
          </div>
        </Card>
      ))}
    </div>
  );

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
        <h1 className="app-title">句子剖析</h1>
        <div style={{ color: 'white' }}>
          <BranchesOutlined style={{ marginRight: '0.5rem' }} />
          深度分析
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            句子逻辑剖析
          </Title>
          
          <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            对复杂句进行深度拆解，分析语法结构、逻辑关系和同类句型，提升语法理解能力
          </Paragraph>

          {!selectedSentence ? (
            // 句子选择页面
            <div>
              <Card title="选择要分析的句子" style={{ marginBottom: '2rem' }}>
                <List
                  dataSource={sentenceAnalyses}
                  renderItem={(analysis) => (
                    <List.Item
                      actions={[
                        <Button 
                          key="analyze" 
                          type="primary" 
                          onClick={() => setSelectedSentence(analysis)}
                        >
                          开始分析
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <div>
                            <Text strong style={{ fontSize: '1.1rem' }}>
                              {analysis.sentence}
                            </Text>
                            <Tag color="blue" style={{ marginLeft: '0.5rem' }}>
                              {analysis.difficulty}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <Paragraph style={{ marginBottom: '0.5rem' }}>
                              {analysis.translation}
                            </Paragraph>
                            <div>
                              <Tag color="green">从句分析</Tag>
                              <Tag color="orange">逻辑关系</Tag>
                              <Tag color="purple">语法要点</Tag>
                              <Tag color="cyan">相似句型</Tag>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          ) : (
            // 句子分析页面
            <div>
              <Card 
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>句子分析</span>
                    <Button onClick={() => setSelectedSentence(null)}>返回选择</Button>
                  </div>
                }
                style={{ marginBottom: '2rem' }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <Text strong style={{ fontSize: '1.2rem' }}>
                    {selectedSentence.sentence}
                  </Text>
                  <Tag color="blue" style={{ marginLeft: '0.5rem' }}>
                    {selectedSentence.difficulty}
                  </Tag>
                </div>
                <Paragraph style={{ color: '#666' }}>
                  {selectedSentence.translation}
                </Paragraph>
              </Card>

              {/* 分析模式选择 */}
              <Card style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <Button 
                    type={analysisMode === 'structure' ? 'primary' : 'default'}
                    onClick={() => setAnalysisMode('structure')}
                  >
                    句子结构
                  </Button>
                  <Button 
                    type={analysisMode === 'logic' ? 'primary' : 'default'}
                    onClick={() => setAnalysisMode('logic')}
                  >
                    逻辑关系
                  </Button>
                  <Button 
                    type={analysisMode === 'grammar' ? 'primary' : 'default'}
                    onClick={() => setAnalysisMode('grammar')}
                  >
                    语法要点
                  </Button>
                </div>

                {analysisMode === 'structure' && renderStructureAnalysis(selectedSentence)}
                {analysisMode === 'logic' && renderLogicAnalysis(selectedSentence)}
                {analysisMode === 'grammar' && renderGrammarAnalysis(selectedSentence)}
              </Card>

              {/* 相似句型 */}
              <Card title="相似句型" style={{ marginBottom: '2rem' }}>
                {renderSimilarPatterns(selectedSentence)}
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage; 